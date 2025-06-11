import React from 'react';
// material UI
// import {Grid} from '@material-ui/core';
// Spinner
import Spinner from './Spinner';

import {pdfjs} from 'react-pdf';

import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// const PdfLoader = dynamic(() => import('src/react-pdf-highlighter/components/PdfLoader'), {
//   ssr: false,
// });
// const Highlight = dynamic(() => import('src/react-pdf-highlighter/components/Highlight'), {
//   ssr: false,
// });
// const Popup = dynamic(() => import('src/react-pdf-highlighter/components/Popup'), {
//   ssr: false,
// });
// const PdfHighlighter = dynamic(
//   () => import('src/react-pdf-highlighter/components/PdfHighlighter'),
//   {
//     ssr: false,
//   }
// );

// const Tip = dynamic(() => import('src/react-pdf-highlighter/components/Tip'), {
//   ssr: false,
// });

// const AreaHighlight = dynamic(() => import('src/react-pdf-highlighter/components/AreaHighlight'), {
//   ssr: false,
// });

const HighlightPopup = ({content}) => {
  return content.text ? <div className="Highlight__popup">{content.text}</div> : null;
};

interface IPdfProps {
  fileUrl: string;
  annotationData?: any;
}

interface AddProps {
  highlights: any;
  url: any;
}

class PdfViewer extends React.Component<IPdfProps, AddProps> {
  constructor(props: IPdfProps) {
    super(props);

    this.state = {
      url: '',
      highlights: [],
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.scrollToHighlightFromHash, false);
  }

  resetHighlights = () => {
    this.setState({
      highlights: [],
    });
  };
  reset = () => {
    localStorage.removeItem('normaliseannotate');
    localStorage.removeItem('timeseriesannotate');
  };
  scrollViewerTo = (_highlight: any) => {
    //
  };

  scrollToHighlightFromHash = () => {
    const {highlights} = this.state;

    if (highlights.length > 0) {
      this.scrollViewerTo(highlights[0]);
    }
  };

  updateHighlight(_highlightId: string, _position: any, _content) {
    this.setState({
      highlights: this.state.highlights.map((h) => {
        // const {position: originalPosition, content: originalContent, ...rest} = h;
        return h;
      }),
    });
  }

  render() {
    const url = this.props.fileUrl;

    let highlights = [];
    if (this.props.annotationData) {
      highlights = [
        {
          content: {text: this.props.annotationData.value},
          position: {
            boundingRect: {
              x1: this.props.annotationData.parseddata.posx,
              y1: this.props.annotationData.parseddata.posy,
              x2: this.props.annotationData.parseddata.posx1,
              y2: this.props.annotationData.parseddata.posy1,
              width: 610.56, // fixed width
              height: 794.04, // fixed height
            },
            rects: [
              {
                x1: this.props.annotationData.parseddata.posx,
                y1: this.props.annotationData.parseddata.posy,
                x2: this.props.annotationData.parseddata.posx1,
                y2: this.props.annotationData.parseddata.posy1,
                width: 610.56, // fixed width
                height: 794.04, // fixed height
              },
            ],
            pageNumber: this.props.annotationData.parseddata.pagenumber,
          },
        },
      ];
    }

    if (highlights.length > 0) {
      this.scrollViewerTo(highlights[0]);
    }

    return (
      <>
        {/* <PdfLoader url={url} beforeLoad={<Spinner />}>
          {(pdfDocument: any) => (
            <PdfHighlighter
              pdfDocument={pdfDocument}
              enableAreaSelection={(event) => event.altKey}
              scrollRef={(scrollTo) => {
                this.scrollViewerTo = scrollTo;

                this.scrollToHighlightFromHash();
              }}
              onSelectionFinished={(position, content, hideTipAndSelection, transformSelection) => (
                <Tip
                  onOpen={transformSelection}
                  onConfirm={(_comment) => {
                    hideTipAndSelection();
                  }}
                />
              )}
              onScrollChange={this.reset}
              highlightTransform={(
                highlight,
                index,
                setTip,
                hideTip,
                viewportToScaled,
                screenshot,
                isScrolledTo
              ) => {
                const isTextHighlight = !(highlight.content && highlight.content.image);

                const component = isTextHighlight ? (
                  <Highlight
                    isScrolledTo={isScrolledTo}
                    position={highlight.position}
                    comment={highlight.comment}
                  />
                ) : (
                  <AreaHighlight
                    highlight={highlight}
                    onChange={(boundingRect) => {
                      this.updateHighlight(
                        highlight.id,
                        {boundingRect: viewportToScaled(boundingRect)},
                        {image: screenshot(boundingRect)}
                      );
                    }}
                  />
                );

                return (
                  <Popup
                    popupContent={<HighlightPopup {...highlight} />}
                    onMouseOver={(popupContent) => setTip(highlight, (_highlight) => popupContent)}
                    onMouseOut={hideTip}
                    key={index}
                    // eslint-disable-next-line react/no-children-prop
                    children={component}
                  />
                );
              }}
              highlights={highlights}
            />
          )}
        </PdfLoader> */}
      </>
    );
  }
}

export default PdfViewer;
