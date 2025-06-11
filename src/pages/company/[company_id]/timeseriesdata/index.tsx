import React, {FC} from 'react';
// clsx
import clsx from 'clsx';
// Hooks
import {useRequest} from 'src/lib/hooks';
// formik
import {useFormik} from 'formik';
// loadash
import _ from 'lodash';

// next Link
import {Link} from 'react-router-dom';
//endpoints
import {COMPANIES_DETAIL, TIMESERIES_VALUES, TIMESERIES_PERIODS} from 'src/lib/constants/endpoints';
// Export as excel
import {CSVLink} from 'react-csv';
// components
import {TemplateSelector} from 'src/components/lookup';
// Data Table
import {CompanyTimeseries} from 'src/components/tables';
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
// Multiselect
import MultiSelect from 'react-multi-select-component';
// router
import {BrowserRouter as Router, Switch, Route, useParams} from 'react-router-dom';

const periodColumns: any = [
  {value: 'COLUMNS', label: 'COLUMNS', cat: 'column', disabled: true},
  {value: 'FY', label: 'FY', cat: 'column', disabled: false},
  {value: 'M9', label: 'M9', cat: 'column', disabled: false},
  {value: 'M6', label: 'M6', cat: 'column', disabled: false},
  {value: 'Q4', label: 'Q4', cat: 'column', disabled: false},
  {value: 'Q3', label: 'Q3', cat: 'column', disabled: false},
  {value: 'Q2', label: 'Q2', cat: 'column', disabled: false},
  {value: 'Q1', label: 'Q1', cat: 'column', disabled: false},
];
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
//       maxWidth: '100%',
//       minHeight: '26px',
//       fontSize: '13px',
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
//         textAlign: 'left !important',
//       },
//       '&:focus': {
//         color: '#000',
//       },
//     },
//     selected: {},
//   })
// )(Tab);

const TimeseriesData: FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Balance Sheet');
  const [sourceView, setSourceView] = React.useState(false);
  const [tableToggle, setTableToggle] = React.useState(false);
  const [excelData, setExcelData] = React.useState([]);
  const [headCells, setHeadCells] = React.useState([]);
  const [filterOptions, setfilterOptions] = React.useState([]);
  const [excelName, setExcelName] = React.useState(null);
  const columnSortBy = ['Q1', 'Q2', 'M6', 'Q3', 'M9', 'Q4', 'FY'];
  const {company_id} = useParams();

  const {data: company_detail}: any = useRequest({
    url: COMPANIES_DETAIL(company_id),
  });
  const {data: table_data}: any = useRequest({
    url: TIMESERIES_VALUES(company_id),
  });
  const {data: table_head}: any = useRequest({
    url: TIMESERIES_PERIODS(company_id),
  });
  const formik = useFormik({
    initialValues: {
      period: null,
      columnOptions: [],
    },
    onSubmit: (values: any) => {
      const data = _.groupBy(values.columnOptions, 'cat');
      if (values.columnOptions.length > 0) {
        if (!data['column'] || !data['years']) {
          const newValue = getHeadCellCombination(values);
          setHeadCells(newValue);
          setExcelData(extractExcelData(newValue));

          getExcelFileName();
        } else {
          const values = headCellCombo(data['years'], data['column']);
          setHeadCells(values);
          setExcelData(extractExcelData(values));
          getExcelFileName();
        }
      } else {
        setHeadCells(getHeadCells());
        setExcelData(extractExcelData(getHeadCells()));
        getExcelFileName();
      }
    },
  });

  const getHeadCellCombination = (values) => {
    const newArr = [];
    values.columnOptions.map((val) => {
      getHeadCells().filter((item) => {
        if (item.includes(val.value)) {
          newArr.push(item);
        }
      });
    });

    if (newArr.length > 0) {
      const datafilter_sort = applyCustomOrder(newArr, columnSortBy);
      const resort = _.sortBy(datafilter_sort, [
        (o) => {
          return o.substring(0, 4);
        },
      ]);
      return resort;
    }
  };

  const headCellCombo = (year, period) => {
    const newArray = [];
    year.map((item) => {
      period.map((r) => {
        newArray.push(item.value + r.value);
      });
    });

    if (newArray.length > 0) {
      const datafilter = newArray.filter((val) => getHeadCells().includes(val));
      const datafilter_sort = applyCustomOrder(datafilter, columnSortBy);

      const resort = _.sortBy(datafilter_sort, [
        (o) => {
          return o.substring(0, 4);
        },
      ]);
      return resort;
    }
  };
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

  // filter options
  const getFilterOptions = () => {
    const extract = table_head.data[0].periodnames;
    const extract_split = extract.replaceAll('"', '').split(',');
    const newData = [{value: 'YEARS', label: 'YEARS', cat: 'years', disabled: true}];
    extract_split.map((item) => {
      newData.push({
        value: item.substring(0, 4),
        label: item.substring(0, 4),
        cat: 'years',
        disabled: false,
      });
    });
    const years = _.uniqBy(newData, 'value');
    return [...periodColumns, ...years];
  };

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

  const pdfFile = company_detail && company_detail.documentid;
  // excel download
  const extractExcelData = (data) => {
    const extract_data = table_data.data;
    const excel_export_data = [];
    extract_data.map((item) => {
      const obj = {};
      obj['uid'] = item.uid;
      obj['displaytablename'] = item.displaytablename;
      obj['keyrowitemname'] = item.keyrowitemname;
      obj['normsequencemin'] = item.normsequencemin;
      obj['tablename'] = item.tablename;
      data.map((row) => {
        obj[row] = (item[row] && item[row].split('|')[0]) || '';
      });
      excel_export_data.push(obj);
    });

    return excel_export_data;
  };
  // get excel name
  const getExcelFileName = () => {
    let excelFileName = '';
    if (formik.values.columnOptions.length > 0) {
      formik.values.columnOptions.map((item) => {
        excelFileName += '_' + item.label;
      });
    }
    setExcelName(excelFileName);
  };

  React.useEffect(() => {
    if (table_data && table_head) {
      setfilterOptions(getFilterOptions());
      if (formik.values.columnOptions.length == 0) {
        setHeadCells(getHeadCells());
        setExcelData(extractExcelData(getHeadCells()));
      }
    }
  }, [table_data, table_head]);

  if (!company_detail || !table_data || !table_head) {
    return (
      <>
        <div className="pl-3">loading...</div>
      </>
    );
  }
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
        <CompanyTimeseries
          data={grouped_data[item]}
          sourceView={sourceView}
          pdfFile={pdfFile}
          headCells={headCells}
          tableToggle={tableToggle}
          handleTableToggle={handleTableToggle}
        />
      </TabPanel>
    );
  });

  const ItemRenderer = ({checked, option, onClick, disabled}) => (
    <div className={clsx('yearfilter', 'item-renderer', disabled && 'disabled')}>
      <input
        className={clsx({['hide']: disabled})}
        type={'checkbox'}
        onChange={onClick}
        checked={checked}
        tabIndex={-1}
        disabled={disabled}
      />
      <span className={clsx({['group-name']: disabled})}>{option.label}</span>
    </div>
  );
  return (
    <>
      <Box>
        <div>
          <Box className="content-align-justify-center headerTop">
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
            <Box className="pl-5" display="flex">
              <form onSubmit={formik.handleSubmit} className="w-100">
                <Box display="flex">
                  <Box style={{width: '250px !important', zIndex: 5}}>
                    <MultiSelect
                      className="filter-select"
                      options={filterOptions}
                      value={formik.values.columnOptions}
                      onChange={(options) => {
                        formik.setFieldValue('columnOptions', options);
                      }}
                      ItemRenderer={ItemRenderer}
                      labelledBy={'Select'}
                      hasSelectAll={false}
                    />
                  </Box>
                  <Box pl={2}>
                    <Button type="submit" variant="contained" color="primary">
                      Filter
                    </Button>
                  </Box>
                </Box>
              </form>
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
                  <Link to={`/company/${company_detail.companyid}/timeseriespdf`} target="_blank">
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
                      filename={company_detail.name + '_' + (excelName ? excelName : '') + '.csv'}
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
              <Grid container style={{maxWidth: '95vw'}}>
                <Grid item className={clsx('MuiGrid-grid-xs-12', {['hide']: tableToggle})}>
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
                  className={clsx('MuiGrid-grid-xs-12 box-flex', {
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

export default TimeseriesData;
