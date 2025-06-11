import React, {FC} from 'react';
// clsx
import clsx from 'clsx';
// Hooks
import {useRequest} from 'src/lib/hooks';
// // router
// import {useRouter} from 'next/router';
// endpoints
import {COMPANIES_DETAIL, TIMESERIES_PARSED} from 'src/lib/constants/endpoints';
// services
import StorageService from 'src/services/StorageService';
// loadash
import _ from 'lodash';
// components
import {PdfViewer, HighlightExample} from 'src/components/elements';
// Resizer
import {Resizable} from 're-resizable';
// material UI
import {
  withStyles,
  createStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Box,
  Grid,
  // Tab,
  Tooltip,
} from '@material-ui/core';
import {TabContext, TabList, TabPanel} from '@material-ui/lab';
import {
  MoreHoriz,
  FormatTextdirectionRToL,
  FormatTextdirectionLToR,
  ArrowBackIos,
  ArrowForwardIos,
} from '@material-ui/icons';
// router
import {BrowserRouter as Router, Switch, Route, useParams} from 'react-router-dom';
// react bootstrap
import {Row, Col, Nav, Tabs, Tab} from 'react-bootstrap';
// react-papaparse
import {readRemoteFile} from 'react-papaparse';

const StyledTableCell = withStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#ADCDF0',
      color: '#000',
      borderBottom: '1px solid #ADCDF0',
      fontSize: '14px',
    },
  })
)(TableCell);

interface ITableDataProps {
  row: any;
  key: any;
  colIndex: any;
  columns: any;
  parsedData: any;
  handleColumnvalue: (data: any) => any;
  data: any;
}
function TableData(props: ITableDataProps) {
  const {row, colIndex, columns, parsedData, data, handleColumnvalue} = props;

  const quantumValue = (data) => {
    if (data !== null || '') {
      const parsedvalue = data.split('|')[1];
      if (parsedData) {
        const item = parsedData.filter((item) => item.parseddataid == parsedvalue);
        if (item.length > 0) {
          const currencyname = (item[0].currencyname && item[0].currencyname) || '';
          const quantumname = (item[0].quantumname && item[0].quantumname) || '';
          return currencyname + '|' + quantumname;
        } else {
          return '';
        }
      }
    } else {
      return '';
    }
  };

  return (
    <React.Fragment>
      <TableRow className="timeseriestable-root">
        <TableCell
          component="th"
          scope="row"
          className={clsx('sticky-col first-col', {even: colIndex % 2})}
        >
          {/* row.keyrowitemname */}
          {/* <Tooltip title={excelData ? excelData.hierarchy : row.displayname}>
            <p className="column-value"> {excelData ? excelData.hierarchy : row.displayname}</p>
          </Tooltip> */}
          <Tooltip title={row.displayname}>
            <p className="column-value"> {row.displayname}</p>
          </Tooltip>
        </TableCell>
        {columns.map((item: any, index: any) => {
          if (!_.every(_.map(data, item), _.isNull)) {
            return (
              <TableCell component="th" scope="row" align="right" key={index}>
                {row[item] ? (
                  <Tooltip title={quantumValue(row[item])}>
                    <span
                      className="clickable-value"
                      onClick={() => handleColumnvalue({value: row[item], year: item})}
                    >
                      {' '}
                      {(row[item] && row[item].split('|')[0]) || ''}
                    </span>
                  </Tooltip>
                ) : (
                  ''
                )}
              </TableCell>
            );
          }
        })}

        <TableCell align="right">
          <IconButton style={{padding: '1px 0'}}>
            <MoreHoriz color="primary" fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface ICompanyTimeseriesProps {
  data: any;
  metaInfo?: any;
  sourceView?: any;
  pdfFile: any;
  headCells: any;
  tableToggle: any;
  handleTableToggle: () => void;
}

const CompanyTimeseries: FC<ICompanyTimeseriesProps> = (props: ICompanyTimeseriesProps) => {
  const {data, sourceView, headCells, tableToggle, handleTableToggle} = props;
  const [height, setHeight] = React.useState(50);
  const [pdfTab, setpdfTab] = React.useState();
  const [annotation, SetAnnotation] = React.useState(null);
  const [parsedData, SetparsedData] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState(undefined);
  const {company_id} = useParams();
  const slideLeft = React.useRef(null);

  const storageService = new StorageService();

  const {data: company_detail}: any = useRequest({
    url: COMPANIES_DETAIL(company_id),
  });
  // const {data: table_head}: any = useRequest({
  //   url: TIMESERIES_PERIODS(company_id),
  // });
  const {data: table_parsed}: any = useRequest({
    url: TIMESERIES_PARSED(company_id),
  });

  // const handlePdf = (event: any, newValue: any) => {
  //   setpdfTab(newValue);
  // };

  const getDocumentIds = () => {
    const tableData = data;
    const parsedId = [];
    tableData.map((item) => {
      headCells.map((row) => {
        if (item[row] !== null || '') {
          parsedId.push(parseInt(item[row].split('|')[1]));
        }
      });
    });
    const document = [];
    table_parsed.data.filter((item) => {
      if (parsedId.includes(item.parseddataid)) {
        document.push(item.documentid);
      }
    });
    storageService.setItem('documentId', _.uniqBy(document));
    return _.uniqBy(document);
  };

  const handleColumnvalue = (data) => {
    const {value: content} = data;

    if (content) {
      const value = content.split('|')[0];
      const parsedvalue = content.split('|')[1];

      if (parsedData) {
        const item = parsedData.filter((item) => item.parseddataid == parsedvalue);

        if (item.length > 0) {
          SetAnnotation({...annotation, value: value, parseddata: item[0]});
          if (pdfTab !== item[0].documentid) {
            // setpdfTab(item[0].documentid);
            setActiveTab(item[0].documentid);
            setTimeout(() => {
              SetAnnotation({...annotation, value: value, parseddata: item[0]});
            }, 3000);
          }
          try {
            storageService.setItem('timeseriesannotate', {
              ...annotation,
              value: value,
              parseddata: item[0],
            });
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
  };

  const pdfFile =
    company_detail &&
    table_parsed &&
    company_detail.documentid.filter((item) => {
      return getDocumentIds().includes(item.documentid);
    });
  const tab_headers = _.sortBy(pdfFile, [
    (o) => {
      return o.period.periodname.substring(0, 4);
    },
  ]);

  React.useEffect(() => {
    if (company_detail && table_parsed) {
      if (!getDocumentIds().includes(parseInt(pdfTab)) && tab_headers.length > 0) {
        setpdfTab(tab_headers[0].documentid);
      }
    }

    if (!pdfTab && tab_headers.length > 0) {
      setpdfTab(tab_headers[0].documentid);
    }
  }, [company_detail, table_parsed, headCells]);

  React.useEffect(() => {
    if (company_detail && table_parsed) {
      SetparsedData(table_parsed.data);
    }
  }, [company_detail, table_parsed]);

  // const pdfViewerTab = tab_headers.map((item: any, index: any) => {
  //   return (
  //     <Tab
  //       className="tabList"
  //       label={item.period.periodname}
  //       value={`${item.documentid}`}
  //       key={index}
  //     />
  //   );
  // });
  const pdfViewerTabPanel = tab_headers.map((item: any, index: any) => {
    return (
      <TabPanel value={`${item.documentid}`} style={{padding: '0'}} key={index}>
        <Grid className="pdfWrapper">
          {annotation ? (
            <HighlightExample
              fileUrl={`https://libero-notes.s3.ap-south-1.amazonaws.com/factstream/${item.filedisplayname}`}
              annotationData={annotation}
            />
          ) : (
            <HighlightExample
              fileUrl={`https://libero-notes.s3.ap-south-1.amazonaws.com/factstream/${item.filedisplayname}`}
            />
          )}
        </Grid>
      </TabPanel>
    );
  });

  if (!company_detail || !table_parsed) {
    return (
      <>
        <div className="pl-3">loading...</div>
      </>
    );
  }
  const handleLeft = () => {
    document.getElementById('tab-nav').scrollLeft -= 300;
  };
  const handleRight = () => {
    document.getElementById('tab-nav').scrollLeft += 300;
  };
  return (
    <>
      <Box pl={2}>
        <Resizable
          style={{background: 'transparent'}}
          minHeight="20%"
          maxHeight="100%"
          size={{height: height + `%`, width: '100%'}}
          enable={{
            top: true,
            right: false,
            bottom: true,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          onResizeStop={(e, direction, ref, d) => {
            setHeight(height + d.height);
          }}
          handleComponent={
            {
              // right: (
              //   <div
              //     className={clsx({
              //       RightReSizer: sourceView,
              //     })}
              //   ></div>
              // ),
            }
          }
          className={clsx({
            ['vertical-view']: sourceView,
          })}
        >
          <div
            style={{height: '100%'}}
            className={clsx({
              'overlay-scroll': sourceView,
            })}
          >
            <TableContainer
              component={Paper}
              className="tableContainer"
              style={{maxHeight: '70vh'}}
            >
              <div className="view">
                <div className="tablewrapper">
                  <Table
                    stickyHeader
                    size="small"
                    aria-label="collapsible table"
                    style={{zIndex: 'auto'}}
                  >
                    <TableHead>
                      <TableRow className="timeserieshead">
                        <StyledTableCell
                          className="head-column d-flex "
                          style={{alignItems: 'center'}}
                        >
                          <Box>
                            <IconButton className="p-0" onClick={handleTableToggle}>
                              {tableToggle ? (
                                <Tooltip title="Open Tables">
                                  <FormatTextdirectionLToR />
                                </Tooltip>
                              ) : (
                                <Tooltip title="Close Tables">
                                  <FormatTextdirectionRToL />
                                </Tooltip>
                              )}
                            </IconButton>
                          </Box>
                          <Box style={{paddingLeft: '5px'}}> {data[0].displaytablename}</Box>
                        </StyledTableCell>
                        {headCells &&
                          headCells.map((item: any, index: any) => {
                            if (!_.every(_.map(data, item), _.isNull)) {
                              return (
                                <StyledTableCell align="right" key={index}>
                                  <Typography style={{fontSize: '14px'}}> {item}</Typography>
                                </StyledTableCell>
                              );
                            }
                          })}
                        <StyledTableCell align="right">Actions</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="tablebody timeseriestable">
                      {data.map((row: any, index: any) => {
                        return (
                          <TableData
                            key={index}
                            colIndex={index}
                            row={row}
                            // excelData={_.filter(excelData, {UID: row.uid})[0]}
                            data={data}
                            columns={headCells}
                            parsedData={parsedData}
                            handleColumnvalue={handleColumnvalue}
                          />
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TableContainer>
          </div>
        </Resizable>
        <Box
          id="pdfcontainer"
          className={clsx({
            ['vertical-view']: sourceView,
            hide: !sourceView,
          })}
        >
          <Grid style={{border: '1px solid #ADCDF0', background: '#fff'}}>
            {tab_headers.length == 0 ? (
              <Typography align="center">Oops! no Pdf available</Typography>
            ) : (
              // <TabContext value={`${pdfTab}`}>
              //   <TabList
              //     onChange={handlePdf}
              //     aria-label="simple tabs"
              //     className="tabview"
              //     TabIndicatorProps={{style: {background: 'transparent'}}}
              //     variant="scrollable"
              //     scrollButtons="auto"
              //   >
              //     {pdfViewerTab}
              //   </TabList>
              //   {pdfViewerTabPanel}
              // </TabContext>
              <>
                <Tab.Container
                  id="left-tabs-example"
                  activeKey={activeTab}
                  defaultActiveKey={tab_headers[0].documentid}
                  onSelect={setActiveTab}
                >
                  <Col sm={12} className="mb-2 mt-2" style={{display: 'flex'}}>
                    <Box>
                      <IconButton aria-label="" size="small" id="slideLeft" onClick={handleLeft}>
                        <ArrowBackIos fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box style={{width: '93%'}}>
                      <Row style={{width: '100%'}}>
                        <Nav variant="pills" className="nav-tabList" id="tab-nav">
                          {_.map(tab_headers, (item, index) => {
                            return (
                              <Nav.Item key={index}>
                                <Nav.Link eventKey={item.documentid}>
                                  {item.period.periodname}
                                </Nav.Link>
                              </Nav.Item>
                            );
                          })}
                        </Nav>
                      </Row>
                    </Box>
                    <Box>
                      <IconButton aria-label="" size="small" id="slideRight" onClick={handleRight}>
                        <ArrowForwardIos fontSize="small" />
                      </IconButton>
                    </Box>
                  </Col>
                  <Col sm={12} className="mb-2 px-2">
                    <Tab.Content>
                      {_.map(tab_headers, (item, index) => {
                        return (
                          <Tab.Pane eventKey={item.documentid} key={index}>
                            <div
                              className="timeseries-pdf-view"
                              style={{
                                height: '60vh',
                                // width: '800px',
                              }}
                            >
                              <HighlightExample
                                fileUrl={`https://libero-notes.s3.ap-south-1.amazonaws.com/factstream/${item.filedisplayname}`}
                                annotationData={annotation}
                              />
                            </div>
                          </Tab.Pane>
                        );
                      })}
                    </Tab.Content>
                  </Col>
                </Tab.Container>
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
};
export default CompanyTimeseries;
