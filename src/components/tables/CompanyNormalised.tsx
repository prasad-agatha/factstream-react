import React, {FC} from 'react';
// clsx
import clsx from 'clsx';
// Hooks
import {useRequest} from 'src/lib/hooks';

// endpoints
import {COMPANIES_DETAIL, NORMALISED_PARSED, NORMALISED_PERIODS} from 'src/lib/constants/endpoints';
// services
import StorageService from 'src/services/StorageService';
// loadash
import _ from 'lodash';
// components
import {PdfViewer, HighlightExample} from 'src/components/elements';
// import NewWindow from 'react-new-window';
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
  Collapse,
  Box,
  Grid,
  // Tab,
  Tooltip,
} from '@material-ui/core';
import {TabContext, TabList, TabPanel} from '@material-ui/lab';
import {
  MoreHoriz,
  KeyboardArrowDown,
  KeyboardArrowRight,
  FormatTextdirectionRToL,
  FormatTextdirectionLToR,
} from '@material-ui/icons';
// modal
// import Modal from 'react-modal';
// import ReactModal from 'react-modal-resizable-draggable';
// import DragResizeContainer from 'react-drag-resize';
// import {Rnd} from 'react-rnd';
// router
import {BrowserRouter as Router, Switch, Route, useParams} from 'react-router-dom';
// react bootstrap
import {Row, Col, Nav, Tabs, Tab} from 'react-bootstrap';

const StyledTableCell = withStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#ADCDF0',
      color: '#000',
      borderBottom: '1px solid #ADCDF0',
      fontSize: '14px',
      minWidth: '140px',
    },
  })
)(TableCell);

interface INestedChildTable {
  row: any;
  columns: any;
  open: any;
  data: any;
  parsedData: any;
  handleColumnvalue: (data: any) => any;
}
function NestedChildTable(props: INestedChildTable) {
  const {row, columns, open, parsedData, data, handleColumnvalue} = props;

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
    <>
      <TableRow>
        <TableCell className="collapseTablecell" colSpan={columns.length + 2}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table aria-label="purchases" size="small">
                <TableBody className="nested-table-body">
                  {row &&
                    row.map((detail: any, index: any) => {
                      return (
                        <>
                          <TableRow key={index} className="nestedRoot">
                            <TableCell
                              component="td"
                              scope="row"
                              className="Nested-NestedtableHeadCollaspse "
                            >
                              <Tooltip title={detail.normrowitemname}>
                                <p className="tablePadding child-column-value nested-column-level4">
                                  {' '}
                                  {detail.normrowitemname}
                                </p>
                              </Tooltip>
                            </TableCell>
                            {columns.map((item: any, index: any) => {
                              if (!_.every(_.map(data, item), _.isNull)) {
                                return (
                                  <TableCell component="td" scope="row" align="right" key={index}>
                                    {detail[item] ? (
                                      <Tooltip title={quantumValue(detail[item])}>
                                        <span
                                          className="clickable-value"
                                          onClick={() => handleColumnvalue(detail[item])}
                                        >
                                          {' '}
                                          {(detail[item] && detail[item].split('|')[0]) || ''}
                                        </span>
                                      </Tooltip>
                                    ) : (
                                      ''
                                    )}
                                  </TableCell>
                                );
                              }
                            })}
                            <TableCell component="td" scope="row" align="right">
                              <IconButton style={{padding: '1px 0'}}>
                                <MoreHoriz color="primary" fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

interface INestedTableData {
  row: any;
  columns: any;
  open: any;
  data: any;
  parsedData: any;
  handleColumnvalue: (data: any) => any;
}
function NestedTableData(props: INestedTableData) {
  const {row, columns, open, data, parsedData, handleColumnvalue} = props;
  const [openNested, setOpenNested] = React.useState(true);

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
    <>
      <TableRow>
        <TableCell className="collapseTablecell" colSpan={columns.length + 2}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table aria-label="purchases" size="small">
                <TableBody className="nested-table-body">
                  {row &&
                    row.map((detail: any, index: any) => {
                      const childdata = data.filter(
                        (item) => item.parentnormrowitemid == detail.normrowitemid
                      );
                      return (
                        <>
                          <TableRow key={index} className="nestedRoot">
                            <TableCell
                              component="td"
                              scope="row"
                              className="Nested-tableHeadCollaspse"
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                className="nested-column-level2"
                              >
                                <p className="m-0">
                                  {childdata.length > 0 ? (
                                    <IconButton
                                      aria-label="expand row"
                                      size="small"
                                      onClick={() => setOpenNested(!openNested)}
                                    >
                                      {openNested ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                                    </IconButton>
                                  ) : (
                                    ''
                                  )}
                                </p>
                                <Tooltip title={detail.normrowitemname}>
                                  <p
                                    className={clsx({
                                      ['tablePadding child-column-value']: childdata.length == 0,
                                      ['column-value']: childdata.length > 0,
                                    })}
                                  >
                                    {detail.normrowitemname}
                                  </p>
                                </Tooltip>
                              </Box>
                            </TableCell>
                            {columns.map((item: any, index: any) => {
                              if (!_.every(_.map(data, item), _.isNull)) {
                                return (
                                  <TableCell component="td" scope="row" align="right" key={index}>
                                    {detail[item] ? (
                                      <Tooltip title={quantumValue(detail[item])}>
                                        <span
                                          className="clickable-value"
                                          onClick={() => handleColumnvalue(detail[item])}
                                        >
                                          {' '}
                                          {(detail[item] && detail[item].split('|')[0]) || ''}
                                        </span>
                                      </Tooltip>
                                    ) : (
                                      ''
                                    )}
                                  </TableCell>
                                );
                              }
                            })}
                            <TableCell component="td" scope="row" align="right">
                              <IconButton style={{padding: '1px 0'}}>
                                <MoreHoriz color="primary" fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                          {childdata.length > 0 ? (
                            <NestedChildTable
                              row={childdata}
                              columns={columns}
                              open={openNested}
                              data={data}
                              parsedData={parsedData}
                              handleColumnvalue={handleColumnvalue}
                            />
                          ) : (
                            ''
                          )}
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

interface ITableDataProps {
  row: any;
  nestedValues: any;
  key: any;
  columns: any;
  data: any;
  parsedData: any;
  handleColumnvalue: (data: any) => any;
}
function TableData(props: ITableDataProps) {
  const {row, nestedValues, columns, data, parsedData, handleColumnvalue} = props;
  const [open, setOpen] = React.useState(true);
  const [childopen, setchildopen] = React.useState(true);

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
      <TableRow className="table-root">
        <TableCell
          component="td"
          scope="row"
          className="tableHeadCollaspse"
          style={{paddingLeft: '0px !important'}}
        >
          <Box display="flex" alignItems="center">
            <p className="m-0">
              {nestedValues.length > 0 ? (
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                </IconButton>
              ) : (
                ''
              )}
            </p>
            <Tooltip title={row.normrowitemname}>
              <p
                className={clsx('column-value', {
                  ['tablePadding child-column-value']: nestedValues.length == 0,
                })}
              >
                {row.normrowitemname}
              </p>
            </Tooltip>
          </Box>
        </TableCell>
        {columns.map((item: any, index: any) => {
          if (!_.every(_.map(data, item), _.isNull)) {
            return (
              <TableCell component="td" scope="row" align="right" key={index}>
                {row[item] ? (
                  <Tooltip title={quantumValue(row[item])}>
                    <span className="clickable-value" onClick={() => handleColumnvalue(row[item])}>
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
        <TableCell component="td" scope="row" align="right">
          <IconButton style={{padding: '1px 0'}}>
            <MoreHoriz color="primary" fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="collapseTablecell" colSpan={columns.length + 2}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table aria-label="purchases" size="small">
                <TableBody className="nested-table-body">
                  {nestedValues &&
                    nestedValues.map((detail: any, index: any) => {
                      // const isItemSelected = isSelected(detail.id);
                      const childdata = data.filter(
                        (item) => item.parentnormrowitemid == detail.normrowitemid
                      );

                      return (
                        <>
                          <TableRow key={index} className="nestedRoot">
                            <TableCell
                              component="td"
                              scope="row"
                              className="NestedtableHeadCollaspse"
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                className="nested-column-level1"
                              >
                                <p className="m-0">
                                  {childdata.length > 0 ? (
                                    <IconButton
                                      aria-label="expand row"
                                      size="small"
                                      onClick={() => setchildopen(!childopen)}
                                    >
                                      {childopen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                                    </IconButton>
                                  ) : (
                                    ''
                                  )}
                                </p>
                                <Tooltip title={detail.normrowitemname}>
                                  <p
                                    className={clsx({
                                      ['tablePadding child-column-value']: childdata.length == 0,
                                      ['column-value']: childdata.length > 0,
                                    })}
                                  >
                                    {detail.normrowitemname}
                                  </p>
                                </Tooltip>
                              </Box>
                            </TableCell>
                            {columns.map((item: any, index: any) => {
                              if (!_.every(_.map(data, item), _.isNull)) {
                                return (
                                  <TableCell component="td" scope="row" align="right" key={index}>
                                    {detail[item] ? (
                                      <Tooltip title={quantumValue(detail[item])}>
                                        <span
                                          className="clickable-value"
                                          onClick={() => handleColumnvalue(detail[item])}
                                        >
                                          {' '}
                                          {(detail[item] && detail[item].split('|')[0]) || ''}
                                        </span>
                                      </Tooltip>
                                    ) : (
                                      ''
                                    )}
                                  </TableCell>
                                );
                              }
                            })}
                            <TableCell component="td" scope="row" align="right">
                              <IconButton style={{padding: '1px 0'}}>
                                <MoreHoriz color="primary" fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                          {childdata.length > 0 ? (
                            <NestedTableData
                              row={childdata}
                              columns={columns}
                              open={childopen}
                              data={data}
                              parsedData={parsedData}
                              handleColumnvalue={handleColumnvalue}
                            />
                          ) : (
                            ''
                          )}
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface ICompanyNormalisedProps {
  data: any;
  metaInfo?: any;
  sourceView?: any;
  pdfPath: any;
  showPdfPopup: any;
  toggleModal: () => void;
  tableToggle: any;
  handleTableToggle: () => void;
}

const CompanyNormalised: FC<ICompanyNormalisedProps> = (props: ICompanyNormalisedProps) => {
  const {data, pdfPath, sourceView, tableToggle, handleTableToggle} = props;
  const [height, setHeight] = React.useState(50);
  const [pdfTab, setPdfTab] = React.useState('1');
  const [annotation, SetAnnotation] = React.useState(null);
  const [parsedData, SetParsedData] = React.useState(null);
  const [headCells, setHeadCells] = React.useState([]);
  const [tabHeader, setTabHeader] = React.useState();
  const columnSortBy = ['Q1', 'Q2', 'M6', 'Q3', 'M9', 'FY'];
  // const router = useRouter();
  const {company_id, document_id} = useParams();
  // const {document_id} = router.query;
  const [activeTab, setActiveTab] = React.useState(undefined);
  const storageService = new StorageService();
  let childData;

  const {data: company_detail}: any = useRequest({
    url: COMPANIES_DETAIL(company_id),
  });
  const {data: table_head}: any = useRequest({
    url: NORMALISED_PERIODS(document_id),
  });
  const {data: table_parsed}: any = useRequest({
    url: NORMALISED_PARSED(document_id),
  });

  // sorting fn
  const applyCustomOrder = (arr, desiredOrder) => {
    const orderForIndexVals = desiredOrder.slice(0).reverse();
    arr.sort((a, b) => {
      const aIndex = -orderForIndexVals.indexOf(a.substring(4, 6));
      const bIndex = -orderForIndexVals.indexOf(b.substring(4, 6));
      return aIndex - bIndex;
    });
    return arr;
  };
  // table heads
  const getHeadCells = () => {
    const periods = table_head.data[0].periodnames;
    const periods_split = periods.replaceAll('"', '').split(',');
    const periods_sort = applyCustomOrder(periods_split, columnSortBy);

    const resort = _.sortBy(periods_sort, [
      (o) => {
        return o.substring(0, 4);
      },
    ]);

    return resort;
  };
  // tab head
  const getTabHead = () => {
    const pdfFile = company_detail.documentid.filter((item: any) => item.documentid == document_id);
    return pdfFile[0].period.periodname;
  };
  React.useEffect(() => {
    if (table_head && company_detail && table_parsed) {
      setHeadCells(getHeadCells());
      setTabHeader(getTabHead());
      SetParsedData(table_parsed.data);
    }
  }, [table_head, company_detail, table_parsed]);

  const handleTab = (event: any, newValue: string) => {
    setPdfTab(newValue);
  };

  const handleColumnvalue = (data) => {
    const value = data.split('|')[0];
    const parsedvalue = data.split('|')[1];
    if (parsedData) {
      const item = parsedData.filter((item) => item.parseddataid == parsedvalue);
      SetAnnotation({...annotation, value: value, parseddata: item[0]});
      try {
        storageService.setItem('normaliseannotate', {
          ...annotation,
          value: value,
          parseddata: item[0],
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (!company_detail || !table_head || !table_parsed) {
    return (
      <>
        <div className="pl-3">loading...</div>
      </>
    );
  }
  return (
    <>
      <Box pl={2}>
        <Resizable
          style={{paddingBottom: '12px', background: 'transparent'}}
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
            // className={clsx({
            //   'overlay-scroll': sourceView == 'landscape' || sourceView == 'portrait',
            // })}
          >
            <TableContainer
              component={Paper}
              className="tableContainer"
              style={{maxHeight: '70vh'}}
            >
              <Table
                stickyHeader
                className="normalised-data-table"
                size="small"
                aria-label="collapsible table"
                style={{zIndex: 'auto'}}
              >
                <TableHead>
                  <TableRow className="normalisehead">
                    <StyledTableCell className="head-column d-flex" style={{alignItems: 'center'}}>
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
                      <Box className="column-value" style={{paddingLeft: '5px'}}>
                        {data[0].displaytablename}
                      </Box>
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
                <TableBody className="normalisedTabledata">
                  {data.map((row: any, index: any) => {
                    if (row.parentnormrowitemid == -1) {
                      childData = data.filter(
                        (item) => item.parentnormrowitemid == row.normrowitemid
                      );
                      return (
                        <TableData
                          key={index}
                          row={row}
                          nestedValues={childData}
                          data={data}
                          columns={headCells}
                          parsedData={parsedData}
                          handleColumnvalue={handleColumnvalue}
                        />
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Resizable>
        <Box
          className={clsx({
            ['vertical-view']: sourceView,
            hide: !sourceView,
          })}
        >
          <Grid style={{border: '1px solid #ADCDF0', background: '#fff'}}>
            {/* <TabContext value={pdfTab}>
              <TabList
                onChange={handleTab}
                aria-label="simple tabs"
                className="tabview"
                TabIndicatorProps={{style: {background: 'transparent'}}}
              >
                <Tab className="tabList" label={tabHeader && tabHeader} value="1" />
              </TabList>
              <TabPanel value="1" style={{padding: '0'}}>
                <Box className="">
                  <Grid className="pdfWrapper-normalised">
                    {annotation ? (
                      <>
                        <HighlightExample
                          fileUrl={`https://libero-notes.s3.ap-south-1.amazonaws.com/factstream/${pdfPath}`}
                          annotationData={annotation}
                        />
                      </>
                    ) : (
                      <>
                        <HighlightExample
                          fileUrl={`https://libero-notes.s3.ap-south-1.amazonaws.com/factstream/${pdfPath}`}
                        />
                      </>
                    )}
                  </Grid>
                </Box>
              </TabPanel>
            </TabContext> */}
            <Tab.Container
              id="left-tabs-example"
              activeKey={activeTab}
              defaultActiveKey="1"
              onSelect={setActiveTab}
            >
              <Col sm={12} className="mb-2 mt-2">
                <Nav variant="pills" className="nav-tabList">
                  <Nav.Item>
                    <Nav.Link eventKey="1">{tabHeader && tabHeader}</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={12} className="mb-2 px-2">
                <Tab.Content>
                  <Tab.Pane eventKey="1">
                    <div
                      className="normalised-pdf-view"
                      style={{
                        height: '60vh',
                        // width: '800px',
                      }}
                    >
                      <HighlightExample
                        fileUrl={`https://libero-notes.s3.ap-south-1.amazonaws.com/factstream/${pdfPath}`}
                        annotationData={annotation}
                      />
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Tab.Container>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
export default CompanyNormalised;
