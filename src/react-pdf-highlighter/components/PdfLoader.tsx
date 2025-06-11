// @flow

import React, {Component} from 'react';

import {getDocument} from 'pdfjs-dist/lib/pdf';

type Props = {
  url: string;
  beforeLoad: any;
  errorMessage?: any;
  children?: (pdfDocument: any) => any;
  onError?: (error: Error) => void;
};

type State = {
  pdfDocument?: any;
  error?: any;
};

class PdfLoader extends Component<Props, State> {
  state = {
    pdfDocument: null,
    error: null,
  };

  documentRef = React.createRef<HTMLElement>();

  componentDidMount() {
    this.load();
  }

  componentWillUnmount() {
    const {pdfDocument: discardedDocument} = this.state;
    if (discardedDocument) {
      discardedDocument.destroy();
    }
  }

  componentDidUpdate({url}: Props) {
    if (this.props.url !== url) {
      this.load();
    }
  }

  componentDidCatch(error: Error) {
    const {onError} = this.props;

    if (onError) {
      onError(error);
    }

    this.setState({pdfDocument: null, error});
  }

  load() {
    const {ownerDocument = document} = this.documentRef.current || {};
    const {url} = this.props;
    const {pdfDocument: discardedDocument} = this.state;
    this.setState({pdfDocument: null, error: null});

    Promise.resolve()
      .then(() => discardedDocument && discardedDocument.destroy())
      .then(
        () =>
          url &&
          getDocument({url, ownerDocument}).promise.then((pdfDocument) => {
            this.setState({pdfDocument});
          })
      )
      .catch((e) => this.componentDidCatch(e));
  }

  render() {
    const {children, beforeLoad} = this.props;
    const {pdfDocument, error} = this.state;

    return (
      <>
        <span ref={this.documentRef} />
        {error
          ? this.renderError()
          : !pdfDocument || !children
          ? beforeLoad
          : children(pdfDocument)}
      </>
    );
  }

  renderError() {
    const {errorMessage} = this.props;
    if (errorMessage) {
      return React.cloneElement(errorMessage, {error: this.state.error});
    }

    return null;
  }
}

export default PdfLoader;
