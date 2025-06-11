import React, {FC} from 'react';
// clsx
import clsx from 'clsx';
// Hooks
import {useRequest} from 'src/lib/hooks';
// loadash
import _ from 'lodash';
// next Link
import {Link} from 'react-router-dom';

// endpoints
import {COMPANIES_DETAIL, NORMALISED_VALUES, NORMALISED_PERIODS} from 'src/lib/constants/endpoints';
// Export as excel
import {CSVLink} from 'react-csv';
// components
import {TemplateSelector} from 'src/components/lookup';
// Data Table
import {CompanyNormalised} from 'src/components/tables';
// Material ui
import {createStyles, Theme, withStyles, makeStyles} from '@material-ui/core/styles';
import {TabContext, TabList, TabPanel} from '@material-ui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Divider,
  Tab,
  Grid,
  Tooltip,
  AppBar,
} from '@material-ui/core';
import {Close} from '@material-ui/icons';
// router
import {BrowserRouter as Router, Switch, Route, useParams} from 'react-router-dom';
const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      background: 'transparent',
      zIndex: 0,
      color: '#000',
      boxShadow: 'none',
    },
    companyHeading: {
      fontSize: '24px',
      fontWeight: 500,
    },
    tabs: {
      minHeight: '38px',
      '&$indicator': {
        backgroundColor: 'transparent',
      },
    },
    tab: {
      border: '1px solid #89AFF0',
      borderRadius: '4px 4px 0 0',
      color: '#89AFF0',
      margin: '0 2px',
    },
    styledButton: {
      color: '#ffffff',
      backgroundColor: '#89AFF0',
      '&:hover': {
        backgroundColor: '#89AFF0',
      },
    },
    viewSource: {
      padding: '11px',
    },
    tabBox: {
      border: '1px solid #89AFF0',
      padding: '0',
      borderRadius: '4px',
      height: '40px',
      color: '#89AFF0',
    },
    spanMenu: {position: 'relative', top: '6px'},
    settingIcon: {position: 'relative', top: '4px', color: '#000', fontSize: '15px'},
    menuItem: {fontSize: '14px'},
    headerTop: {background: '#ffffff', padding: '8px 30px'},
    tabContent: {padding: '0px', marginTop: '15px'},
  })
);
const AntTabs = withStyles({
  root: {
    minHeight: '38px',
    '&>.MuiTabs-scroller>.MuiTabs-flexContainer': {
      borderBottom: '1px solid #ADCDF0',
      paddingLeft: '30px',
    },
  },
  indicator: {
    backgroundColor: 'transparent',
  },
})(TabList);
const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      minHeight: 38,
      fontSize: '12px',
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(0.6),
      background: '#ffffff',
      border: '1px solid #ADCDF0',
      borderBottom: '0',
      borderRadius: '4px 4px 0 0',
      color: '#4A90E2',
      // marginBottom: '-1px',
      opacity: 1,
      '&:hover': {
        color: '#4A90E2',
        opacity: 1,
      },
      '&$selected': {
        color: '#000',
        fontWeight: 500,
        borderBottomColor: 'transparent',
        background: '#F4F9FE',
        marginBottom: '-2px',
      },
      '&:focus': {
        color: '#000',
      },
    },
    selected: {},
  })
)(Tab);
// const AntTabs = withStyles({
//   root: {
//     minHeight: '38px',
//   },
//   indicator: {
//     backgroundColor: 'transparent',
//   },
// })(TabList);
// const AntTab = withStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       textTransform: 'capitalize',
//       minWidth: 72,
//       fontSize: '13px',
//       maxWidth: '100%',
//       minHeight: '26px',
//       padding: '1px 0',
//       paddingLeft: '10px',
//       fontWeight: theme.typography.fontWeightRegular,
//       color: '#4A90E2',
//       opacity: 1,
//       '&:hover': {
//         color: '#4A90E2',
//         opacity: 1,
//       },
//       '&$selected': {
//         color: '#000',
//         fontWeight: 500,
//         borderLeft: '3px solid #0b478d',
//         background: 'rgba(11, 71, 141, 0.16)',
//       },
//       '&:focus': {
//         color: '#000',
//       },
//     },
//     selected: {},
//   })
// )(Tab);

const NormalisedData: FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Balance Sheet');
  // const [dataType, setDataType] = React.useState(0);
  const [sourceView, setSourceView] = React.useState(false);
  const [tableToggle, setTableToggle] = React.useState(false);
  const [excelData, setExcelData] = React.useState([]);
  // const router = useParams();

  const {company_id} = useParams();
  const {document_id} = useParams();

  const {data: company_detail}: any = useRequest({
    url: COMPANIES_DETAIL(company_id),
  });
  const {data: table_data}: any = useRequest({
    url: NORMALISED_VALUES(document_id),
  });
  const {data: table_head}: any = useRequest({
    url: NORMALISED_PERIODS(document_id),
  });

  const handleTableToggle = () => {
    setTableToggle(!tableToggle);
  };
  const handleTemplateOpen = () => {
    setOpen(true);
  };

  const handleTemplateClose = () => {
    setOpen(false);
  };

  const handleChange = (event: any, newValue: string) => {
    try {
      setValue(newValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handleViewSource = () => {
    setSourceView(!sourceView);
  };

  const [showPdfPopup, setShowPdfPopup] = React.useState(false);
  function toggleModal() {
    setShowPdfPopup(!showPdfPopup);
  }

  const extractExcelData = () => {
    const extract_periods = table_head.data[0].periodnames.replaceAll('"', '').split(',');
    const extract_data = table_data.data;
    const excel_export_data = extract_data.map((row) => {
      const newData = {};
      extract_periods.map((item) => {
        newData[item] = (row[item] && row[item].split('|')[0]) || '';
      });
      return {...row, ...newData};
    });

    return excel_export_data;
  };
  React.useEffect(() => {
    if (table_data && table_head) {
      setExcelData(extractExcelData());
    }
  }, [table_data, table_head]);

  if (!company_detail || !table_data || !table_head) {
    return (
      <>
        <div className="pl-3">loading...</div>
      </>
    );
  }
  const pdfFile =
    company_detail &&
    company_detail.documentid.filter((item: any) => item.documentid == document_id);
  const grouped_data = _.groupBy(table_data.data, 'tablename');

  const grouped_data_keys = Object.keys(grouped_data).map((item: any) => {
    return (
      <AntTab
        key={item}
        className={classes.tab}
        label={
          <Tooltip title={item == 'null' ? 'Others' : item}>
            <span>
              {grouped_data[item][0].displaytablename
                ? grouped_data[item][0].displaytablename
                : 'Others'}
            </span>
          </Tooltip>
        }
        value={item}
      />
    );
  });
  const grouped_data_keys_value = Object.keys(grouped_data).map((item: any) => {
    return (
      <TabPanel key={item} value={item} style={{padding: '0'}}>
        <CompanyNormalised
          data={grouped_data[item]}
          sourceView={sourceView}
          pdfPath={pdfFile[0].filedisplayname}
          showPdfPopup={showPdfPopup}
          toggleModal={toggleModal}
          tableToggle={tableToggle}
          handleTableToggle={handleTableToggle}
        />
      </TabPanel>
    );
  });
  return (
    <>
      <Box mb={4}>
        <div>
          <Box display="flex" justifyContent="center" alignItems="center" className="headerTop">
            <Box display="flex">
              <Typography className="companyHeading">
                <span style={{fontWeight: 400}}>{company_detail && company_detail.name} </span>
              </Typography>
              <Typography className="quantum-text">
                <span className="value-text pl-2">
                  {company_detail ? (
                    <>
                      {company_detail.currency.currencyname}&nbsp;
                      {company_detail.quantum.quantumname} except per share
                    </>
                  ) : (
                    ''
                  )}
                </span>
              </Typography>
            </Box>
            <Box mr={3} ml="auto" display="flex" className="tabBox">
              <Box display="flex">
                <Box style={{borderRight: '1px solid #89aff0'}}>
                  <a
                    onClick={handleViewSource}
                    className="iconColor"
                    style={{
                      textDecoration: 'none',
                      padding: '8px 6px',
                    }}
                  >
                    <Tooltip title="PDF Viewer">
                      <img
                        src="https://raw.githubusercontent.com/soulpage/image-assets/master/pdf.svg"
                        className="pdf-icon"
                      ></img>
                    </Tooltip>
                  </a>
                </Box>

                <Box mr={2}>
                  <Link
                    to={`/company/${company_detail.companyid}/normalisedpdf/${document_id}`}
                    target="_blank"
                  >
                    <a
                      className="iconColor"
                      style={{
                        textDecoration: 'none',
                        padding: '8px 6px',
                      }}
                    >
                      <Tooltip title="Popout PDF">
                        <img
                          src="https://raw.githubusercontent.com/soulpage/image-assets/master/popout.svg"
                          className="popout-icon"
                        ></img>
                      </Tooltip>
                    </a>
                  </Link>
                </Box>
                <Box pt={1} style={{borderRight: '1px solid #89aff0', width: '43px'}}>
                  {excelData.length > 0 ? (
                    <CSVLink
                      data={excelData}
                      filename={
                        company_detail.name + '_' + `${pdfFile[0].filedisplayname}` + '.csv'
                      }
                      style={{
                        padding: '4px 4px',
                      }}
                    >
                      <Tooltip title="Export to Excel">
                        <img
                          src="https://raw.githubusercontent.com/soulpage/image-assets/master/excel-app.svg"
                          className="excel-icon"
                        ></img>
                      </Tooltip>
                    </CSVLink>
                  ) : (
                    ''
                  )}
                </Box>
                <Box>
                  <a
                    onClick={handleTemplateOpen}
                    className="iconColor"
                    style={{
                      textDecoration: 'none',
                      padding: '8px 6px',
                    }}
                  >
                    <Tooltip title="Map To Template">
                      <img
                        src="https://raw.githubusercontent.com/soulpage/image-assets/master/map_template.svg"
                        className="template-icon"
                      ></img>
                    </Tooltip>
                  </a>
                </Box>
              </Box>
            </Box>
            <Box mr={1}>
              {company_detail ? (
                <>
                  <Link to={`/company/${company_detail.companyid}/timeseriesdata/`}>
                    <a
                      className="filled-button"
                      style={{
                        textDecoration: 'none',
                        color: '#000',
                        fontWeight: 'normal',
                        padding: '11px 0px',
                      }}
                    >
                      <Button className="filled-button">Timeseries Data</Button>
                    </a>
                  </Link>
                </>
              ) : (
                ''
              )}
            </Box>
            <Box>
              <Dialog
                className="dialog-form pb-3"
                open={open}
                onClose={handleTemplateClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title" className="popupTitle">
                  <Typography variant="h6">Map to Template</Typography>
                  <IconButton
                    aria-label="close"
                    className="closeButton"
                    onClick={handleTemplateClose}
                  >
                    <Close style={{color: 'white'}} />
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  <div className="mt-2">
                    <TemplateSelector handleTemplateClose={handleTemplateClose} />
                  </div>
                </DialogContent>
              </Dialog>
            </Box>
          </Box>
          <Divider />

          <div className="content-box">
            <TabContext value={value}>
              <Grid container>
                <Grid
                  item
                  className={clsx('MuiGrid-grid-xs-12', {['hide']: tableToggle})}
                  // style={{maxWidth: '220px'}}
                >
                  {/* <Box className="tabMenu"> */}
                  <AppBar position="static" className={clsx('mb-3', classes.appBar)}>
                    <AntTabs
                      // orientation="vertical"
                      onChange={handleChange}
                      aria-label="simple tabs example"
                      variant="scrollable"
                      scrollButtons="on"
                    >
                      {grouped_data_keys}
                    </AntTabs>
                  </AppBar>
                  {/* </Box> */}
                </Grid>
                <Grid
                  item
                  className={clsx('MuiGrid-grid-xs-12 box-flex ', {
                    ['MuiGrid-grid-xs-12']: tableToggle,
                  })}
                >
                  <Box>{grouped_data_keys_value}</Box>
                </Grid>
              </Grid>
            </TabContext>
          </div>
        </div>
      </Box>
    </>
  );
};

export default NormalisedData;
