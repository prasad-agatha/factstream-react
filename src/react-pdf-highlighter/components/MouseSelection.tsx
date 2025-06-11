// @flow

import React, {Component} from 'react';

import {asElement, isHTMLElement} from '../lib/pdfjs-dom';
import styles from '../style/MouseSelection.module.css';

type Coords = {
  x: number;
  y: number;
};

type State = {
  locked: boolean;
  start?: Coords;
  end?: Coords;
};

type Props = {
  onSelection: (startTarget: HTMLElement, boundingRect: any, resetSelection: () => void) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  shouldStart: (event: MouseEvent) => boolean;
  onChange: (isVisible: boolean) => void;
};

class MouseSelection extends Component<Props, State> {
  state: State = {
    locked: false,
    start: null,
    end: null,
  };

  root: any;

  reset = () => {
    const {onDragEnd} = this.props;

    onDragEnd();
    this.setState({start: null, end: null, locked: false});
  };

  getBoundingRect(start: Coords, end: Coords) {
    return {
      left: Math.min(end.x, start.x),
      top: Math.min(end.y, start.y),

      width: Math.abs(end.x - start.x),
      height: Math.abs(end.y - start.y),
    };
  }

  componentDidUpdate() {
    const {onChange} = this.props;
    const {start, end} = this.state;

    const isVisible = Boolean(start && end);

    onChange(isVisible);
  }

  componentDidMount() {
    if (!this.root) {
      return;
    }

    const {onSelection, onDragStart, onDragEnd, shouldStart} = this.props;

    const container = asElement(this.root.parentElement);

    if (!isHTMLElement(container)) {
      return;
    }

    let containerBoundingRect = null;

    const containerCoords = (pageX: number, pageY: number) => {
      if (!containerBoundingRect) {
        containerBoundingRect = container.getBoundingClientRect();
      }

      return {
        x: pageX - containerBoundingRect.left + container.scrollLeft,
        y: pageY - containerBoundingRect.top + container.scrollTop,
      };
    };

    container.addEventListener('mousemove', (event: MouseEvent) => {
      const {start, locked} = this.state;

      if (!start || locked) {
        return;
      }

      this.setState({
        ...this.state,
        end: containerCoords(event.pageX, event.pageY),
      });
    });

    container.addEventListener('mousedown', (event: MouseEvent) => {
      if (!shouldStart(event)) {
        this.reset();
        return;
      }

      const startTarget = asElement(event.target);
      if (!isHTMLElement(startTarget)) {
        return;
      }

      onDragStart();

      this.setState({
        start: containerCoords(event.pageX, event.pageY),
        end: null,
        locked: false,
      });

      const onMouseUp = (event: MouseEvent): void => {
        // emulate listen once
        event.currentTarget.removeEventListener('mouseup', onMouseUp);

        const {start} = this.state;

        if (!start) {
          return;
        }

        const end = containerCoords(event.pageX, event.pageY);

        const boundingRect = this.getBoundingRect(start, end);

        if (
          !isHTMLElement(event.target) ||
          !container.contains(asElement(event.target)) ||
          !this.shouldRender(boundingRect)
        ) {
          this.reset();
          return;
        }

        this.setState(
          {
            end,
            locked: true,
          },
          () => {
            const {start, end} = this.state;

            if (!start || !end) {
              return;
            }

            if (isHTMLElement(event.target)) {
              onSelection(startTarget, boundingRect, this.reset);

              onDragEnd();
            }
          }
        );
      };

      const {ownerDocument: doc} = container;
      if (doc.body) {
        doc.body.addEventListener('mouseup', onMouseUp);
      }
    });
  }

  shouldRender(boundingRect) {
    return boundingRect.width >= 1 && boundingRect.height >= 1;
  }

  render() {
    const {start, end} = this.state;

    return (
      <div ref={(node) => (this.root = node)}>
        {start && end ? (
          <div className={styles.root} style={this.getBoundingRect(start, end)} />
        ) : null}
      </div>
    );
  }
}

export default MouseSelection;
