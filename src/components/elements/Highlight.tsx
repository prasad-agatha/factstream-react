import * as React from 'react';
import {PrimaryButton, SpecialZoomLevel, Viewer, Worker} from '@react-pdf-viewer/core';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import {Zoom} from '@react-pdf-viewer/full-screen';
import {OnHighlightKeyword} from '@react-pdf-viewer/search';
import {zoomPlugin} from '@react-pdf-viewer/zoom';
import {highlightPlugin} from '@react-pdf-viewer/highlight';

// material Ui
import {styled} from '@material-ui/core/styles';

import {Box, IconButton} from '@material-ui/core';

const HighlightExample = (props) => {
  const {fileUrl, annotationData} = props;
  const [currentPage, setCurrentPage] = React.useState(null);
  const [currentScale, setCurrentScale] = React.useState(0);
  // const [currentDoc, setCurrentDoc] = React.useState(null);

  // count digit
  const countDigits = (num, count = 0) => {
    if (num) {
      return countDigits(Math.floor(num / 10), ++count);
    }
    return count;
  };

  // custom width
  const getCustomWidth = () => {
    return countDigits(parseFloat(annotationData?.value.replace(/[^\w\s]/gi, ''))) * 6;
  };

  const notes = [
    {
      highlightAreas: [
        {
          height: annotationData?.parseddata.posy1,
          left: annotationData?.parseddata.posx,
          pageIndex: annotationData?.parseddata.pagenumber - 1,
          top: annotationData?.parseddata.posy,
          width: annotationData?.parseddata.posx1,
        },
      ],
      quote: annotationData?.value,
    },
  ];

  React.useEffect(() => {
    try {
      if (annotationData?.parseddata && currentPage !== annotationData?.parseddata.pagenumber - 1) {
        jumpToHighlightArea({
          height: annotationData?.parseddata.posy1,
          left: annotationData?.parseddata.posx,
          pageIndex: annotationData?.parseddata.pagenumber - 1,
          top: annotationData?.parseddata.posy / 10,
          width: annotationData?.parseddata.posx1,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [annotationData]);

  // const onPageChange = (e) => {
  //   console.log(e);
  //   setCurrentPage(e.currentPage);
  //   // storageService.removeItem('normaliseannotate')
  // };

  const handleDocumentLoad = (e) => {
    // setCurrentDoc(e.doc);
    // if (currentDoc && currentDoc !== e.doc) {
    //   // User opens new document
    //   // notes = undefined;
    // }
    try {
      if (annotationData?.parseddata && currentPage !== annotationData?.parseddata.pagenumber - 1) {
        jumpToHighlightArea({
          height: annotationData?.parseddata.posy1,
          left: annotationData?.parseddata.posx,
          pageIndex: annotationData?.parseddata.pagenumber - 1,
          top: annotationData?.parseddata.posy / 10,
          width: annotationData?.parseddata.posx1,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleZoom = (e) => {
    console.log(e);
    if (e.scale == 1) {
      setCurrentScale(0);
      return;
    }
    const scale = (e.scale - 1) * 100 + 0.5;
    console.log(scale);
    setCurrentScale(scale);
  };
  const MyDiv = styled(Box)({
    height: `${currentScale / 10 + 10}px !important`,
    width: `${(getCustomWidth() || 10) + (currentScale / 10) * 2}px !important`,
    top: `${
      annotationData?.parseddata.posy + (currentScale * annotationData?.parseddata.posy) / 100
    }px !important`,
    left: `${
      annotationData?.parseddata.posx + (currentScale * annotationData?.parseddata.posx) / 100
    }px !important`,
  });

  const renderHighlights = (props) => {
    // console.log('highlight', notes);
    // console.log('props', props);

    return (
      <div>
        {notes.map((note, index) => (
          <React.Fragment key={index}>
            {note.highlightAreas
              // Filter all highlights on the current page
              .filter((area) => area.pageIndex === props.pageIndex)
              .map((area, idx) => {
                return (
                  <>
                    <MyDiv
                      key={idx}
                      style={Object.assign(
                        {},
                        {
                          background: 'blue',
                          opacity: 0.4,
                        },
                        props.getCssProperties(area, props.rotation)
                      )}
                    />
                  </>
                );
              })}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const highlightPluginInstance = highlightPlugin({
    renderHighlights,
  });
  const {jumpToHighlightArea} = highlightPluginInstance;
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    toolbarPlugin: {
      searchPlugin: {
        // keyword: ['document', 'PDF'], // 'supported by',
        onHighlightKeyword: (props: OnHighlightKeyword) => {
          if (props.keyword.source === 'document') {
            props.highlightEle.style.outline = '2px dashed blue';
            props.highlightEle.style.backgroundColor = 'rgba(0, 0, 0, .1)';
          }
        },
      },
      fullScreenPlugin: {
        onEnterFullScreen: (zoom: Zoom) => {
          zoom(SpecialZoomLevel.PageFit);
        },
        onExitFullScreen: (zoom: Zoom) => {
          zoom(SpecialZoomLevel.PageFit);
        },
      },
    },
  });

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.js">
      {/* <div
        style={{
          height: '680px',
          // width: '800px',
        }}
      > */}
      <Viewer
        fileUrl={fileUrl}
        defaultScale={1}
        plugins={[defaultLayoutPluginInstance, highlightPluginInstance]}
        onDocumentLoad={handleDocumentLoad}
        // onPageChange={onPageChange}
        onZoom={handleZoom}
      />
      {/* </div> */}
    </Worker>
  );
};

export default HighlightExample;
