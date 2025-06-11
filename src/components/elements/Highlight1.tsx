import React, {ReactElement} from 'react';
import {
  Button,
  Position,
  PrimaryButton,
  Tooltip,
  Viewer,
  PluginFunctions,
} from '@react-pdf-viewer/core';
import {defaultLayoutPlugin, ToolbarProps, ToolbarSlot} from '@react-pdf-viewer/default-layout';
import {toolbarPlugin} from '@react-pdf-viewer/toolbar';
import {NextIcon, PreviousIcon, RenderSearchProps, searchPlugin} from '@react-pdf-viewer/search';
import {highlightPlugin, MessageIcon} from '@react-pdf-viewer/highlight';
import {pageNavigationPlugin, RenderCurrentPageLabelProps} from '@react-pdf-viewer/page-navigation';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// material Ui
import {makeStyles, styled} from '@material-ui/core/styles';
import {Box, IconButton} from '@material-ui/core';
import {ArrowBackIos, ArrowForwardIos} from '@material-ui/icons';

interface IPdfProps {
  fileUrl: string;
  annotationData?: any;
}

// styles
const useStyles = makeStyles({
  root: {
    height: '10px !important',
    width: '15px !important',
    // top:(props) =>props.annotationData,
    padding: 0,
    margin: 0,
  },
});

const HighlightExample = (props: IPdfProps) => {
  const {fileUrl, annotationData} = props;
  const [message, setMessage] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(null);
  // const [notes, setNotes] = React.useState([
  //   {
  //     highlightAreas: [
  //       {
  //         height: 134.155517578125,
  //         left: 589.106262207031,
  //         pageIndex: 58,
  //         top: 143.873138427734,
  //         width: 575.943725585938,
  //       },
  //     ],
  //     quote: '924',
  //   },
  // ]);
  console.log(annotationData);
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
  // styled Highlighter div
  const MyDiv = styled(Box)({
    height: '10px !important',
    width: `${getCustomWidth() || 10}px !important`,
    top: `${annotationData?.parseddata.posy}px !important`,
    left: `${annotationData?.parseddata.posx}px !important`,
  });

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
    if (notes[0].highlightAreas[0]) {
      if (currentPage !== annotationData?.parseddata.pagenumber - 1) {
        const a = {
          height: annotationData?.parseddata.posy1,
          left: annotationData?.parseddata.posx,
          pageIndex: annotationData?.parseddata.pagenumber - 1,
          top: 0,
          width: annotationData?.parseddata.posx1,
        };
        // jumpToPage(a.pageIndex);
        jumpToHighlightArea(a);
      }
    }
  }, [annotationData]);

  const onPageChange = (e) => {
    console.log(e);
    setCurrentPage(e.currentPage);
  };

  const notesContainerRef = React.useRef(null);
  const noteId = notes.length;
  const noteEles = new Map();
  const [currentDoc, setCurrentDoc] = React.useState(null);
  const handleDocumentLoad = (e) => {
    setCurrentDoc(e.doc);
    if (currentDoc && currentDoc !== e.doc) {
      // User opens new document
      //   setNotes([]);
    }
  };
  const jumpToNote = (note) => {
    // console.log(note);

    // activateTab(3);
    const notesContainer = notesContainerRef.current;
    if (noteEles.has(note.id) && notesContainer) {
      notesContainer.scrollTop = noteEles.get(note.id).getBoundingClientRect().top;
    }
  };
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
  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const {
          CurrentPageInput,
          CurrentPageLabel,
          CurrentScale,
          GoToNextPage,
          GoToPreviousPage,
          NumberOfPages,
          ZoomIn,
          ZoomOut,
          ShowSearchPopover,
        } = slots;
        return (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <div style={{padding: '0px 2px'}}>
              {/* <ShowSearchPopover /> */}
              <Search>
                {(renderSearchProps: RenderSearchProps) => {
                  const [readyToSearch, setReadyToSearch] = React.useState(false);
                  return (
                    <>
                      <div
                        style={{
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                          display: 'flex',
                          padding: '0 2px',
                        }}
                      >
                        <input
                          style={{
                            border: 'none',
                            padding: '8px',
                            width: '200px',
                          }}
                          placeholder="Enter to search"
                          type="text"
                          value={renderSearchProps.keyword}
                          onChange={(e) => {
                            setReadyToSearch(false);
                            renderSearchProps.setKeyword(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if (e.keyCode === 13 && renderSearchProps.keyword) {
                              setReadyToSearch(true);
                              renderSearchProps.search();
                            }
                          }}
                        />
                      </div>
                      {readyToSearch &&
                        renderSearchProps.keyword &&
                        renderSearchProps.numberOfMatches === 0 && (
                          <div style={{padding: '0 8px'}}>Not found</div>
                        )}
                      {readyToSearch &&
                        renderSearchProps.keyword &&
                        renderSearchProps.numberOfMatches > 0 && (
                          <div style={{padding: '0 8px'}}>
                            {renderSearchProps.currentMatch} of {renderSearchProps.numberOfMatches}
                          </div>
                        )}
                      <div style={{padding: '0 2px'}}>
                        <Tooltip
                          position={Position.BottomCenter}
                          target={
                            <Button onClick={renderSearchProps.jumpToPreviousMatch}>
                              <PreviousIcon />
                            </Button>
                          }
                          content={() => 'Previous match'}
                          offset={{left: 0, top: 8}}
                        />
                      </div>
                      <div style={{padding: '0 2px'}}>
                        <Tooltip
                          position={Position.BottomCenter}
                          target={
                            <Button onClick={renderSearchProps.jumpToNextMatch}>
                              <NextIcon />
                            </Button>
                          }
                          content={() => 'Next match'}
                          offset={{left: 0, top: 8}}
                        />
                      </div>
                    </>
                  );
                }}
              </Search>
            </div>
            {/* <div style={{padding: '0px 2px'}}>
              <ZoomOut>
                {(props) => (
                  <button
                    style={{
                      backgroundColor: '#357edd',
                      border: 'none',
                      borderRadius: '4px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      padding: '8px',
                    }}
                    onClick={props.onClick}
                  >
                    Zoom out
                  </button>
                )}
              </ZoomOut>
            </div> */}
            {/* <div style={{padding: '0px 2px'}}>
              <CurrentScale>
                {(props) => <span>{`${Math.round(props.scale * 100)}%`}</span>}
              </CurrentScale>
            </div> */}
            {/* <div style={{padding: '0px 2px'}}>
              <ZoomIn>
                {(props) => (
                  <button
                    style={{
                      backgroundColor: '#357edd',
                      border: 'none',
                      borderRadius: '4px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      padding: '8px',
                    }}
                    onClick={props.onClick}
                  >
                    Zoom in
                  </button>
                )}
              </ZoomIn>
            </div> */}
            <div style={{padding: '0px 2px', marginLeft: 'auto'}}>
              <GoToPreviousPage>
                {(props) => (
                  <IconButton size="small" onClick={props.onClick}>
                    <ArrowBackIos />
                  </IconButton>
                )}
              </GoToPreviousPage>
            </div>
            <div style={{padding: '0px 2px'}}>
              <CurrentPageInput /> / <NumberOfPages />
            </div>
            <div style={{padding: '0px 2px'}}>
              <GoToNextPage>
                {(props) => (
                  <IconButton size="small" onClick={props.onClick}>
                    <ArrowForwardIos />
                  </IconButton>
                )}
              </GoToNextPage>
            </div>
          </div>
        );
      }}
    </Toolbar>
  );
  const highlightPluginInstance = highlightPlugin({
    renderHighlights,
  });
  const {jumpToHighlightArea, renderViewer} = highlightPluginInstance;

  const defaultLayoutPluginInstance = defaultLayoutPlugin({renderToolbar});
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const {
    CurrentPageInput,
    GoToFirstPageButton,
    GoToLastPage,
    GoToNextPage,
    GoToPreviousPage,
    jumpToPage,
  } = pageNavigationPluginInstance;

  // const toolbarPluginInstance = toolbarPlugin({renderToolbar});

  const searchPluginInstance = searchPlugin();
  const {Search} = searchPluginInstance;
  // const {activateTab} = defaultLayoutPluginInstance;
  // console.log(notes);

  return (
    <div
      style={{
        border: '1px solid rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div
        style={{
          backgroundColor: '#eeeeee',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          padding: '4px',
        }}
      >
        <Box>
          <div style={{padding: '0px 2px', display: 'flex'}}>
            <Search>
              {(renderSearchProps: RenderSearchProps) => {
                const [readyToSearch, setReadyToSearch] = React.useState(false);
                return (
                  <>
                    <div
                      style={{
                        border: '1px solid rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        padding: '0 2px',
                      }}
                    >
                      <input
                        style={{
                          border: 'none',
                          padding: '2px',
                          width: '160px',
                        }}
                        placeholder="Enter to search"
                        type="text"
                        value={renderSearchProps.keyword}
                        onChange={(e) => {
                          setReadyToSearch(false);
                          renderSearchProps.setKeyword(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.keyCode === 13 && renderSearchProps.keyword) {
                            setReadyToSearch(true);
                            renderSearchProps.search();
                          }
                        }}
                      />
                    </div>
                    {readyToSearch &&
                      renderSearchProps.keyword &&
                      renderSearchProps.numberOfMatches === 0 && (
                        <div style={{padding: '0 8px'}}>Not found</div>
                      )}
                    {readyToSearch &&
                      renderSearchProps.keyword &&
                      renderSearchProps.numberOfMatches > 0 && (
                        <div style={{padding: '0 8px'}}>
                          {renderSearchProps.currentMatch} of {renderSearchProps.numberOfMatches}
                        </div>
                      )}
                    {renderSearchProps.currentMatch > 1 && (
                      <div style={{padding: '0 2px'}}>
                        <Tooltip
                          position={Position.BottomCenter}
                          target={
                            <Button onClick={renderSearchProps.jumpToPreviousMatch}>
                              <PreviousIcon />
                            </Button>
                          }
                          content={() => 'Previous match'}
                          offset={{left: 0, top: 8}}
                        />
                      </div>
                    )}
                    {renderSearchProps.currentMatch < renderSearchProps.numberOfMatches && (
                      <div style={{padding: '0 2px'}}>
                        <Tooltip
                          position={Position.BottomCenter}
                          target={
                            <Button onClick={renderSearchProps.jumpToNextMatch}>
                              <NextIcon />
                            </Button>
                          }
                          content={() => 'Next match'}
                          offset={{left: 0, top: 8}}
                        />
                      </div>
                    )}
                  </>
                );
              }}
            </Search>
          </div>
        </Box>
        <Box display="flex" ml="auto">
          <div style={{padding: '0px 2px'}}>
            <GoToPreviousPage />
          </div>
          <div style={{padding: '0px 2px'}}>
            <CurrentPageInput />
          </div>
          <div style={{padding: '0px 2px'}}>
            <GoToNextPage />
          </div>
        </Box>
      </div>
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <Viewer
          fileUrl={fileUrl}
          // defaultScale={1}
          plugins={[searchPluginInstance, pageNavigationPluginInstance, highlightPluginInstance]}
          onDocumentLoad={handleDocumentLoad}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};
export default HighlightExample;
