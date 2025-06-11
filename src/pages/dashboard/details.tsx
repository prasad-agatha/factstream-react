import React, {FC} from 'react';
// Hooks
import {useRequest} from 'src/lib/hooks';
// Data Table
import {CompanyDetails} from 'src/components/tables';
// modal
// import {UploadJsonModal} from 'src/components/modals';
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
  AppBar,
  Tab,
  Tabs,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {FileCopy, KeyboardArrowDown, Settings, Close} from '@material-ui/icons';
// components
import {TemplateSelector} from 'src/components/lookup';
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
      borderBottom: '1px solid #ADCDF0',
      paddingLeft: '30px',
    },
  },
  indicator: {
    backgroundColor: 'transparent',
  },
})(Tabs);
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
      borderRadius: '4px 4px 0 0',
      color: '#4A90E2',
      marginBottom: '-1px',
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
      },
      '&:focus': {
        color: '#000',
      },
    },
    selected: {},
  })
)(Tab);
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  key: any;
}
function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={4}>{children}</Box>}
    </div>
  );
}
function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const DetailPage: FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [jsonData, setJsonData] = React.useState(Array);
  const handleTemplateOpen = () => {
    setOpen(true);
  };
  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const handleTemplateClose = () => {
    setOpen(false);
  };
  const handleUploadModel = () => {
    setOpenUpload(!openUpload);
  };

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const {data: tables}: any = useRequest({
    url: 'http://localhost:3000/api/cashflow/tables',
  });
  // console.log(tables);

  if (!tables) {
    return <>loading..</>;
  }
  const tables_head = tables.tables.map((item: any, index: any) => {
    return <AntTab key={index} label={item.text} {...a11yProps(`${item.sortNo}`)} />;
  });

  const tab_panels = tables.tables.map((item: any, index: any) => {
    return (
      <TabPanel key={index} value={value} index={index}>
        <CompanyDetails data={item.sections} />
      </TabPanel>
    );
  });

  return (
    <>
      <Box>
        <div>
          <Box display="flex" justifyContent="center" className={classes.headerTop}>
            <Box>
              <Typography className={classes.companyHeading}>
                Tata Steel Ltd. - <span style={{fontWeight: 400}}>Company Financials</span>
              </Typography>
            </Box>
            <Box mr={3} ml="auto" display="flex" className={classes.tabBox}>
              <Box className={classes.viewSource}>View/Hide Source</Box>
              <Box>
                <Tabs
                  value={value}
                  TabIndicatorProps={{style: {background: 'transparent'}}}
                  className={classes.tabs}
                >
                  <ButtonTab label={<FileCopy fontSize="small" />} />
                  <ButtonTab label={<FileCopy fontSize="small" />} />
                  <ButtonTab label={<FileCopy fontSize="small" />} />
                </Tabs>
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
          <div className={classes.tabContent}>
            <AppBar position="static" className={classes.appBar}>
              <AntTabs value={value} onChange={handleChange} aria-label="simple tabs example">
                {tables_head}
                <AntTab
                  label={
                    <>
                      <div>
                        <span>Others</span>&nbsp;
                        <KeyboardArrowDown
                          className={classes.spanMenu}
                          fontSize="small"
                          color="primary"
                        />
                        <Settings className={classes.settingIcon} fontSize="small" />
                        &nbsp;
                      </div>
                    </>
                  }
                  {...a11yProps(4)}
                  className={classes.tab}
                  onClick={handleMenu}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                />
                <Button
                  style={{marginLeft: 'auto', marginRight: '32px'}}
                  className="filled-button"
                  onClick={handleUploadModel}
                >
                  Upload Json
                </Button>
              </AntTabs>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeMenu}
              >
                <MenuItem className={classes.menuItem}>
                  <Settings fontSize="small" />
                  &nbsp;&nbsp; Table 1
                </MenuItem>
                <MenuItem className={classes.menuItem}>
                  <Settings fontSize="small" />
                  &nbsp;&nbsp; Table 2
                </MenuItem>
                <MenuItem className={classes.menuItem}>
                  <Settings fontSize="small" />
                  &nbsp;&nbsp;Table 3
                </MenuItem>
              </Menu>
            </AppBar>
            {/* <TabPanel value={value} index={0}>
              Summary
            </TabPanel>
            <TabPanel value={value} index={1}>
              <CompanyFinancials />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <IncomeStatement />
            </TabPanel>
            <TabPanel value={value} index={3}>
              Cash Flow
            </TabPanel>
            <TabPanel value={value} index={4}>
              Others
            </TabPanel> */}
            {tab_panels}
            {/* upload json Model */}
            {/* <UploadJsonModal openModal={openUpload} handleUploadModel={handleUploadModel} /> */}
          </div>
        </div>
      </Box>
    </>
  );
};

export default DetailPage;
