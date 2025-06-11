import React, {FC} from 'react';
import {Typography, IconButton, Box} from '@material-ui/core';
import {SkipPrevious, SkipNext} from '@material-ui/icons';
// import {Document, Page} from 'react-pdf';
// import {pdfjs} from 'react-pdf/dist/esm/entry.webpack';
// pdfjs.GlobalWorkerOptions.workerSrc = `../../node_modules/pdfjs-dist/build/pdf.worker`;

interface IDocViewerProps {
  fileUrl: any;
  annotationData?: any;
}

const DocViewer: FC<IDocViewerProps> = (props: IDocViewerProps) => {
  const {annotationData} = props;
  // const [scale, setScale] = React.useState(1);
  const [state, setState] = React.useState({
    numPages: null,
    pageNumber: 1,
  });
  React.useEffect(() => {
    if (annotationData) {
      // console.log(annotationData);

      setState({...state, pageNumber: annotationData.pagenumber});
    }
  }, [annotationData]);
  // const onDocumentLoadSuccess = (document) => {
  //   const {numPages} = document;
  //   setState({...state, numPages, pageNumber: 1});
  // };
  const changePage = (offset) =>
    setState((prevState) => ({...state, pageNumber: prevState.pageNumber + offset}));

  const previousPage = () => changePage(-1);

  const nextPage = () => changePage(1);
  return (
    <div className="pdfApp">
      <div className="pdfnavigation-box">
        <Box display="flex" alignItems="center" className="pdf-header">
          {/* <Box>
            <Typography style={{fontSize: '12px'}}>
              Q3-2019-Financial-Results-News-Release-6.3.pdf
            </Typography>
          </Box> */}
          <Box display="flex" alignItems="center" ml="auto">
            <Typography style={{fontSize: '12px'}}>
              Page {state.pageNumber || (state.numPages ? 1 : '--')} of total{' '}
              {state.numPages || '--'}
            </Typography>
            <Typography style={{fontSize: '12px'}}>
              <IconButton size="small" disabled={state.pageNumber <= 1} onClick={previousPage}>
                <SkipPrevious />
              </IconButton>
              <IconButton
                size="small"
                disabled={state.pageNumber >= state.numPages}
                onClick={nextPage}
              >
                <SkipNext />
              </IconButton>
              {/* <IconButton size="small" onClick={() => setScale((v) => v + 0.1)}>
                <ZoomIn color="primary" />
              </IconButton>
              <IconButton size="small" onClick={() => setScale((v) => v - 0.1)}>
                <ZoomOut color="primary" />
              </IconButton>
              Zoom */}
            </Typography>
          </Box>
        </Box>
      </div>
      {/* <Document
        className="pdfwrapper"
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        option={{
          maxImageSize: 1,
        }}
        renderMode="svg"
      >
        <Page pageNumber={state.pageNumber} />
      </Document> */}
    </div>
  );
};

export default DocViewer;
