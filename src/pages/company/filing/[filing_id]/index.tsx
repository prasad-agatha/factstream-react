import React, {FC} from 'react';
// clsx
import clsx from 'clsx';
// Hooks
// import {useRequest} from 'lib/hooks';
// Data Table
import {CompanyFinancials} from 'src/components/tables';
// modal
import {UploadJsonModal} from 'src/components/modals';
// Material ui
import {createStyles, Theme, withStyles, makeStyles} from '@material-ui/core/styles';
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
  Tabs,
  Grid,
  // Collapse,
} from '@material-ui/core';
import {
  FileCopy,
  // KeyboardArrowDown, KeyboardArrowUp,
  Close,
} from '@material-ui/icons';
// components
import {TemplateSelector} from 'src/components/lookup';
// import {useRouter} from 'next/router';
// import {FILING_DETAIL} from 'lib/constants/endpoints';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

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
      // minHeight: '38px',
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
    spanMenu: {position: 'relative', top: '0px'},
    settingIcon: {position: 'relative', top: '4px', color: '#000', fontSize: '15px'},
    menuItem: {fontSize: '14px'},
    headerTop: {background: '#ffffff', padding: '8px 30px'},
    tabContent: {padding: '0px 24px', marginTop: '15px', display: 'flex', maxWidth: '1275px'},
    content: {height: '100%', width: '100%'},
    horizontal: {
      height: '50% !important',
      width: '100% !important',
    },
    vertical: {
      height: '100% !important',
      width: '50% !important',
      float: 'left',
    },
    borderBottom: {
      borderBottom: '1px solid #ccc',
    },
    tabNav: {
      height: '400px',
      border: '1px solid #ADCDF0',
      background: '#ffffff',
    },
  })
);
const ButtonTab = withStyles(() =>
  createStyles({
    root: {
      minWidth: 50,
      minHeight: '38px',
      fontSize: '12px',
      color: '#89AFF0',
      border: '1px solid #89AFF0',
      borderTop: 0,
      borderBottom: 0,
      '&:hover': {
        backgroundColor: '#89AFF0',
        color: '#fff',
        opacity: 1,
      },
      '&.Mui-selected': {
        backgroundColor: '#89AFF0',
        color: '#ffffff',
        borderBottom: '0',
      },
      '&:last-child': {
        borderRight: '0',
      },
    },
  })
)(Tab);
const AntTabs = withStyles({
  root: {
    minHeight: '38px',
    '&>.MuiTabs-scroller>.MuiTabs-flexContainer': {
      // border: '1px solid #ADCDF0',
      // height: '400px',
    },
  },
  indicator: {
    backgroundColor: 'transparent',
  },
})(TabList);
const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'capitalize',
      minWidth: 72,
      fontSize: '12px',
      fontWeight: theme.typography.fontWeightRegular,
      // background: '#ffffff',
      // border: '1px solid #ADCDF0',
      // borderRadius: '4px 4px 0 0',
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
        borderLeft: '3px solid #0b478d',
        background: 'rgba(11, 71, 141, 0.16)',
      },
      '&:focus': {
        color: '#000',
      },
    },
    selected: {},
  })
)(Tab);

const Filing: FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  const [value, setValue] = React.useState(String);
  // const [anchorEl, setAnchorEl] = React.useState(false);
  const [jsonData, setJsonData] = React.useState(Array);
  const [tabNav, setTabnav] = React.useState(false);
  const [metaData, setMetaData] = React.useState(Object);
  // const router = useRouter();
  // const [currency, setCurrency] = React.useState(metaData.currency);
  const [dataType, setDataType] = React.useState(0);
  const [dateType, setDateType] = React.useState(1);
  const [sourceView, setSourceView] = React.useState('hide');
  const [tableToggle, setTableToggle] = React.useState(false);
  // const [openEdit, setOpenEdit] = React.useState(false);
  // const {filing_id} = router.query;

  // const {data: filing_details}: any = useRequest({url: FILING_DETAIL(filing_id)});

  // const {data: tables}: any = useRequest({
  //   url: 'http://localhost:3000/api/cashflow/devjson',
  // });
  // console.log(tables);

  // if (!filing_details) {
  //   return <>loading..</>;
  // }
  // const handleCurrency = (event: React.ChangeEvent<{value: unknown}>) => {
  //   setCurrency(event.target.value as string);
  // };

  const handleDataType = (event: any, newValue: number) => {
    setDataType(newValue);
  };
  const handleDateType = (event: any, newValue: number) => {
    setDateType(newValue);
  };
  // const handleCommit = () => {
  //   setOpenEdit(!openEdit);
  // };
  const handleTableToggle = () => {
    setTableToggle(!tableToggle);
  };
  const handleTemplateOpen = () => {
    setOpen(true);
  };
  // const handleMenu = () => {
  //   setAnchorEl(!anchorEl);
  // };
  // const closeMenu = () => {
  //   setAnchorEl(null);
  // };
  const handleTemplateClose = () => {
    setOpen(false);
  };
  const handleUploadModel = () => {
    setOpenUpload(!openUpload);
  };
  const handleTableData = (data: any) => {
    setJsonData(data.tables);
    setValue(data.tables[0].tableId);
    setMetaData(data);
    setTabnav(true);
  };

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  const tab_head = jsonData.filter((item: any) => {
    return item.group_name !== 'others';
  });
  const tables_head = tab_head.map((item: any, index: any) => {
    return <AntTab key={index} label={item.group_name} value={item.tableId} />;
  });
  const tab_panels = jsonData.map((item: any, index: any) => {
    return (
      <TabPanel key={index} value={item.tableId} style={{padding: '0'}}>
        <CompanyFinancials data={item} metaInfo={metaData} sourceView={sourceView} />
      </TabPanel>
    );
  });
  const other_tab_head = jsonData.filter((item: any) => {
    return item.group_name == 'others';
  });
  const handleViewSource = (event: any, data: string) => {
    setSourceView(data);
  };

  return (
    <>
      <Box mb={4}>
        <div>
          <Box display="flex" justifyContent="center" className={classes.headerTop}>
            <Box>
              <Typography className={classes.companyHeading}>
                {/* {filing_details.company.name} -{' '} */}
                <span style={{fontWeight: 400}}>Company Financials</span>
              </Typography>
            </Box>
            <Box mr={3} ml="auto" display="flex" className={classes.tabBox}>
              <Box className={classes.viewSource}>View/Hide Source</Box>
              <Box>
                <TabContext value={sourceView}>
                  <TabList
                    onChange={handleViewSource}
                    TabIndicatorProps={{style: {background: 'transparent'}}}
                    className={classes.tabs}
                  >
                    <ButtonTab label={<FileCopy fontSize="small" />} value="hide" />
                    <ButtonTab label={<FileCopy fontSize="small" />} value="portrait" />
                    <ButtonTab label={<FileCopy fontSize="small" />} value="landscape" />
                  </TabList>
                </TabContext>
              </Box>
            </Box>
            <Box>
              <Button
                variant="contained"
                className={classes.styledButton}
                onClick={handleTemplateOpen}
              >
                Map To Template
              </Button>
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
          <Grid>
            <Box mt={3} px={3} display="flex" justifyContent="center">
              <Box justifyContent="center" alignItems="center">
                <Typography variant="h5">Summary</Typography>
                <Typography>
                  <span className="value-text">All values are in Indian Rupees, in Crore.</span>
                </Typography>
              </Box>

              <Box ml="auto" mr={2}>
                <Button
                  style={{marginRight: '32px'}}
                  className="filled-button"
                  onClick={handleUploadModel}
                >
                  Upload Json
                </Button>
                <Button
                  style={{marginRight: '32px'}}
                  className="filled-button"
                  onClick={handleTableToggle}
                >
                  Tables
                </Button>
              </Box>
              <Box mr={2}>
                <Tabs
                  value={dataType}
                  TabIndicatorProps={{style: {background: 'transparent'}}}
                  onChange={handleDataType}
                  style={{minHeight: '30px', border: '1px solid #76A9E2', borderRadius: '4px'}}
                >
                  <ButtonTab label="Standalone" />
                  <ButtonTab label="Consolidated" />
                </Tabs>
              </Box>
              <Box>
                <Tabs
                  value={dateType}
                  TabIndicatorProps={{style: {background: 'transparent'}}}
                  onChange={handleDateType}
                  style={{minHeight: '30px', border: '1px solid #76A9E2', borderRadius: '4px'}}
                >
                  <ButtonTab label="Annual" />
                  <ButtonTab label="Quarterly" />
                </Tabs>
              </Box>
            </Box>
          </Grid>
          <div className={classes.tabContent}>
            <TabContext value={value}>
              <Grid item className={clsx('MuiGrid-grid-xs-2', {['hide']: tableToggle})}>
                <AntTabs
                  orientation="vertical"
                  variant="scrollable"
                  onChange={handleChange}
                  aria-label="simple tabs example"
                  className={clsx({[classes.tabNav]: tabNav})}
                >
                  {tables_head}
                  {other_tab_head.map((item: any, index: any) => {
                    return (
                      <AntTab key={index} value={item.tableId} label={'Table' + item.tableId} />
                    );
                  })}
                </AntTabs>
              </Grid>
              <Grid
                item
                className={clsx('MuiGrid-grid-xs-10', {['MuiGrid-grid-xs-12']: tableToggle})}
              >
                <Box>{tab_panels}</Box>
              </Grid>
            </TabContext>
            {/* upload json Model */}
            <UploadJsonModal
              openModal={openUpload}
              handleUploadModel={handleUploadModel}
              handleTableData={handleTableData}
            />
          </div>
        </div>
      </Box>
    </>
  );
};

export default Filing;
