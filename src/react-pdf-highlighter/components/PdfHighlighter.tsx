/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// @flow
import React, {PureComponent} from 'react';
import ReactDom from 'react-dom';
import Pointable from 'react-pointable';
import debounce from 'lodash.debounce';

import {EventBus, PDFViewer, PDFLinkService} from 'pdfjs-dist/web/pdf_viewer';

//$FlowFixMe
import 'pdfjs-dist/web/pdf_viewer.css';
import '../style/pdf_viewer.module.css';

import styles from '../style/PdfHighlighter.module.css';

import getBoundingRect from '../lib/get-bounding-rect';
import getClientRects from '../lib/get-client-rects';
import getAreaAsPng from '../lib/get-area-as-png';

import {
  asElement,
  getPageFromRange,
  getPageFromElement,
  getWindow,
  findOrCreateContainerLayer,
  isHTMLElement,
} from '../lib/pdfjs-dom';

import TipContainer from './TipContainer';
import MouseSelection from './MouseSelection';

import {scaledToViewport, viewportToScaled} from '../lib/coordinates';

import type {
  T_Position,
  T_ScaledPosition,
  T_Highlight,
  T_Scaled,
  T_LTWH,
  T_EventBus,
  T_PDFJS_Viewer,
  T_PDFJS_LinkService,
} from '../types';

type T_ViewportHighlight<T_HT> = {position: T_Position} & T_HT;

type State<T_HT> = {
  ghostHighlight?: {
    position: T_ScaledPosition;
  };
  isCollapsed: boolean;
  range?: Range;
  tip?: {
    highlight: T_ViewportHighlight<T_HT>;
    callback: (highlight: T_ViewportHighlight<T_HT>) => any;
  };
  isAreaSelectionInProgress: boolean;
  scrolledToHighlightId: string;
};

type Props<T_HT> = {
  highlightTransform: (
    highlight: T_ViewportHighlight<T_HT>,
    index: number,
    setTip: (
      highlight: T_ViewportHighlight<T_HT>,
      callback: (highlight: T_ViewportHighlight<T_HT>) => any
    ) => void,
    hideTip: () => void,
    viewportToScaled: (rect: T_LTWH) => T_Scaled,
    screenshot: (position: T_LTWH) => string,
    isScrolledTo: boolean
  ) => any;
  highlights: any;
  onScrollChange: () => void;
  scrollRef: (scrollTo: (highlight: T_Highlight) => void) => void;
  pdfScaleValue: string;
  onSelectionFinished: (
    position: T_ScaledPosition,
    content: {text?: string; image?: string},
    hideTipAndSelection: () => void,
    transformSelection?: () => void
  ) => any;
  enableAreaSelection: (event: MouseEvent) => boolean;
  pdfDocument: any;
};

const EMPTY_ID = 'empty-id';

class PdfHighlighter extends PureComponent {
  static defaultProps = {
    pdfScaleValue: 'auto',
  };

  state = {
    ghostHighlight: null,
    isCollapsed: true,
    range: null,
    scrolledToHighlightId: EMPTY_ID,
    isAreaSelectionInProgress: false,
    tip: null,
  };

  eventBus: T_EventBus = new EventBus();
  linkService: T_PDFJS_LinkService = new PDFLinkService({
    eventBus: this.eventBus,
  });
  viewer: T_PDFJS_Viewer;

  resizeObserver = null;
  containerNode = null;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unsubscribe = () => {};

  constructor(props: any) {
    super(props);
    // if (typeof ResizeObserver !== 'undefined') {
    // this.resizeObserver = new ResizeObserver(this.debouncedScaleValue);
    // }
  }

  componentDidMount() {
    this.init();
  }

  attachRef = (ref?: HTMLDivElement) => {
    const {eventBus, resizeObserver: observer} = this;
    this.containerNode = ref;
    this.unsubscribe();

    if (ref) {
      const {ownerDocument: doc} = ref;
      eventBus.on('textlayerrendered', this.onTextLayerRendered);
      eventBus.on('pagesinit', this.onDocumentReady);
      doc.addEventListener('selectionchange', this.onSelectionChange);
      doc.addEventListener('keydown', this.handleKeyDown);
      doc.defaultView.addEventListener('resize', this.debouncedScaleValue);
      if (observer) observer.observe(ref);

      this.unsubscribe = () => {
        eventBus.off('pagesinit', this.onDocumentReady);
        eventBus.off('textlayerrendered', this.onTextLayerRendered);
        doc.removeEventListener('selectionchange', this.onSelectionChange);
        doc.removeEventListener('keydown', this.handleKeyDown);
        doc.defaultView.removeEventListener('resize', this.debouncedScaleValue);
        if (observer) observer.disconnect();
      };
    }
  };

  componentDidUpdate(prevProps: any) {
    const {pdfDocument, highlights}: any = this.props;
    if (prevProps.pdfDocument !== pdfDocument) {
      this.init();
      return;
    }
    if (prevProps.highlights !== highlights) {
      this.renderHighlights(this.props);
    }
  }

  init() {
    const {pdfDocument}: any = this.props;

    this.viewer =
      this.viewer ||
      new PDFViewer({
        container: this.containerNode,
        eventBus: this.eventBus,
        enhanceTextSelection: true,
        removePageBorders: true,
        linkService: this.linkService,
      });

    this.linkService.setDocument(pdfDocument);
    this.linkService.setViewer(this.viewer);
    this.viewer.setDocument(pdfDocument);

    // debug
    // window.PdfViewer = this;
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  findOrCreateHighlightLayer(page: number) {
    const {textLayer} = this.viewer.getPageView(page - 1) || {};

    if (!textLayer) {
      return null;
    }

    return findOrCreateContainerLayer(
      textLayer.textLayerDiv,
      `PdfHighlighter__highlight-layer ${styles.highlightLayer}`,
      '.PdfHighlighter__highlight-layer'
    );
  }

  groupHighlightsByPage(highlights: any): {[pageNumber: string]: any} {
    const {ghostHighlight} = this.state;

    return [...highlights, ghostHighlight].filter(Boolean).reduce((res, highlight) => {
      const {pageNumber} = highlight.position;

      res[pageNumber] = res[pageNumber] || [];
      res[pageNumber].push(highlight);

      return res;
    }, {});
  }

  showTip(highlight: any, content: any) {
    const {isCollapsed, ghostHighlight, isAreaSelectionInProgress} = this.state;

    const highlightInProgress = !isCollapsed || ghostHighlight;

    if (highlightInProgress || isAreaSelectionInProgress) {
      return;
    }

    this.renderTipAtPosition(highlight.position, content);
  }

  scaledPositionToViewport({
    pageNumber,
    boundingRect,
    rects,
    usePdfCoordinates,
  }: T_ScaledPosition): T_Position {
    const viewport = this.viewer.getPageView(pageNumber - 1).viewport;

    return {
      boundingRect: scaledToViewport(boundingRect, viewport, usePdfCoordinates),
      rects: (rects || []).map((rect) => scaledToViewport(rect, viewport, usePdfCoordinates)),
      pageNumber,
    };
  }

  viewportPositionToScaled({pageNumber, boundingRect, rects}: T_Position): T_ScaledPosition {
    const viewport = this.viewer.getPageView(pageNumber - 1).viewport;

    return {
      boundingRect: viewportToScaled(boundingRect, viewport),
      rects: (rects || []).map((rect) => viewportToScaled(rect, viewport)),
      pageNumber,
    };
  }

  screenshot(position: T_LTWH, pageNumber: number) {
    const canvas = this.viewer.getPageView(pageNumber - 1).canvas;

    return getAreaAsPng(canvas, position);
  }

  renderHighlights(nextProps?: any) {
    const {highlightTransform, highlights}: any = nextProps || this.props;

    const {pdfDocument}: any = this.props;

    const {tip, scrolledToHighlightId} = this.state;

    const highlightsByPage = this.groupHighlightsByPage(highlights);

    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
      const highlightLayer = this.findOrCreateHighlightLayer(pageNumber);

      if (highlightLayer) {
        ReactDom.render(
          <div>
            {(highlightsByPage[String(pageNumber)] || []).map(
              ({position, id, ...highlight}, index) => {
                const viewportHighlight: any = {
                  id,
                  position: this.scaledPositionToViewport(position),
                  ...highlight,
                };

                if (tip && tip.highlight.id === String(id)) {
                  this.showTip(tip.highlight, tip.callback(viewportHighlight));
                }

                const isScrolledTo = Boolean(scrolledToHighlightId === id);

                return highlightTransform(
                  viewportHighlight,
                  index,
                  (highlight, callback) => {
                    this.setState({
                      tip: {highlight, callback},
                    });

                    this.showTip(highlight, callback(highlight));
                  },
                  this.hideTipAndSelection,
                  (rect) => {
                    const viewport = this.viewer.getPageView(pageNumber - 1).viewport;

                    return viewportToScaled(rect, viewport);
                  },
                  (boundingRect) => this.screenshot(boundingRect, pageNumber),
                  isScrolledTo
                );
              }
            )}
          </div>,
          highlightLayer
        );
      }
    }
  }

  hideTipAndSelection = () => {
    const tipNode = findOrCreateContainerLayer(this.viewer.viewer, 'PdfHighlighter__tip-layer');

    ReactDom.unmountComponentAtNode(tipNode);

    this.setState({ghostHighlight: null, tip: null}, () => this.renderHighlights());
  };

  renderTipAtPosition(position: T_Position, inner?: any) {
    const {boundingRect, pageNumber} = position;

    const page = {
      node: this.viewer.getPageView(pageNumber - 1).div,
    };

    const pageBoundingRect = page.node.getBoundingClientRect();

    const tipNode = findOrCreateContainerLayer(this.viewer.viewer, 'PdfHighlighter__tip-layer');

    ReactDom.render(
      <TipContainer
        scrollTop={this.viewer.container.scrollTop}
        pageBoundingRect={pageBoundingRect}
        style={{
          left: page.node.offsetLeft + boundingRect.left + boundingRect.width / 2,
          top: boundingRect.top + page.node.offsetTop,
          bottom: boundingRect.top + page.node.offsetTop + boundingRect.height,
        }}
        // eslint-disable-next-line react/no-children-prop
        children={inner}
      />,
      tipNode
    );
  }

  onTextLayerRendered = () => {
    this.renderHighlights();
  };

  scrollTo = (highlight: T_Highlight) => {
    const {pageNumber, boundingRect, usePdfCoordinates} = highlight.position;

    this.viewer.container.removeEventListener('scroll', this.onScroll);

    const pdfPageView = this.viewer.getPageView(pageNumber - 1);
    if (pdfPageView) {
      const pageViewport = pdfPageView.viewport;

      const scrollMargin = 10;

      this.viewer.scrollPageIntoView({
        pageNumber,
        destArray: [
          null,
          {name: 'XYZ'},
          ...pageViewport.convertToPdfPoint(
            0,
            scaledToViewport(boundingRect, pageViewport, usePdfCoordinates).top - scrollMargin
          ),
          0,
        ],
      });
    }

    this.setState(
      {
        scrolledToHighlightId: highlight.id,
      },
      () => this.renderHighlights()
    );

    // wait for scrolling to finish
    setTimeout(() => {
      this.viewer.container.addEventListener('scroll', this.onScroll);
    }, 100);
  };

  onDocumentReady = () => {
    const {scrollRef}: any = this.props;

    this.handleScaleValue();

    scrollRef(this.scrollTo);
  };

  onSelectionChange = () => {
    const container = this.containerNode;
    const selection: Selection = getWindow(container).getSelection();
    const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    if (selection.isCollapsed) {
      this.setState({isCollapsed: true});
      return;
    }

    if (!range || !container || !container.contains(range.commonAncestorContainer)) {
      return;
    }

    this.setState({
      isCollapsed: false,
      range,
    });

    this.debouncedAfterSelection();
  };

  onScroll = () => {
    const {onScrollChange}: any = this.props;

    onScrollChange();

    this.setState(
      {
        scrolledToHighlightId: EMPTY_ID,
      },
      () => this.renderHighlights()
    );

    this.viewer.container.removeEventListener('scroll', this.onScroll);
  };

  onMouseDown = (event: MouseEvent) => {
    if (!isHTMLElement(event.target)) {
      return;
    }

    if (asElement(event.target).closest('#PdfHighlighter__tip-container')) {
      return;
    }

    this.hideTipAndSelection();
  };

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Escape') {
      this.hideTipAndSelection();
    }
  };

  afterSelection = () => {
    const {onSelectionFinished}: any = this.props;

    const {isCollapsed, range} = this.state;

    if (!range || isCollapsed) {
      return;
    }

    const page: any = getPageFromRange(range);

    if (!page) {
      return;
    }

    const rects = getClientRects(range, page.node);

    if (rects.length === 0) {
      return;
    }

    const boundingRect = getBoundingRect(rects);

    const viewportPosition = {boundingRect, rects, pageNumber: page.number};

    const content = {
      text: range.toString(),
    };
    const scaledPosition = this.viewportPositionToScaled(viewportPosition);

    this.renderTipAtPosition(
      viewportPosition,
      onSelectionFinished(
        scaledPosition,
        content,
        () => this.hideTipAndSelection(),
        () =>
          this.setState(
            {
              ghostHighlight: {position: scaledPosition},
            },
            () => this.renderHighlights()
          )
      )
    );
  };

  debouncedAfterSelection: () => void = debounce(this.afterSelection, 500);

  toggleTextSelection(flag: boolean) {
    this.viewer.viewer.classList.toggle(styles.disableSelection, flag);
  }

  handleScaleValue = () => {
    if (this.viewer) {
      const {pdfScaleValue}: any = this.props;
      this.viewer.currentScaleValue = pdfScaleValue; //"page-width";
    }
  };

  debouncedScaleValue: () => void = debounce(this.handleScaleValue, 500);

  render() {
    const {onSelectionFinished, enableAreaSelection}: any = this.props;

    return (
      <Pointable onPointerDown={this.onMouseDown}>
        <div ref={this.attachRef} className={styles.root} onContextMenu={(e) => e.preventDefault()}>
          <div className="pdfViewer" />
          {typeof enableAreaSelection === 'function' ? (
            <MouseSelection
              onDragStart={() => this.toggleTextSelection(true)}
              onDragEnd={() => this.toggleTextSelection(false)}
              onChange={(isVisible) => this.setState({isAreaSelectionInProgress: isVisible})}
              shouldStart={(event) =>
                enableAreaSelection(event) &&
                isHTMLElement(event.target) &&
                Boolean(asElement(event.target).closest('.page'))
              }
              onSelection={(startTarget, boundingRect, resetSelection) => {
                const page = getPageFromElement(startTarget);

                if (!page) {
                  return;
                }

                const pageBoundingRect = {
                  ...boundingRect,
                  top: boundingRect.top - page.node.offsetTop,
                  left: boundingRect.left - page.node.offsetLeft,
                };

                const viewportPosition = {
                  boundingRect: pageBoundingRect,
                  rects: [],
                  pageNumber: page.number,
                };

                const scaledPosition = this.viewportPositionToScaled(viewportPosition);

                const image = this.screenshot(pageBoundingRect, page.number);

                this.renderTipAtPosition(
                  viewportPosition,
                  onSelectionFinished(
                    scaledPosition,
                    {image},
                    () => this.hideTipAndSelection(),
                    () =>
                      this.setState(
                        {
                          ghostHighlight: {
                            position: scaledPosition,
                            content: {image},
                          },
                        },
                        () => {
                          resetSelection();
                          this.renderHighlights();
                        }
                      )
                  )
                );
              }}
            />
          ) : null}
        </div>
      </Pointable>
    );
  }
}

export default PdfHighlighter;
