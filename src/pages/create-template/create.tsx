import React, {FC} from 'react';
import {createStyles, Theme, withStyles, makeStyles} from '@material-ui/core/styles';
// material ui
import {
  Box,
  Button,
  Typography,
  AppBar,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  Grid,
  TextField,
  FormControl,
  Select,
} from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import {KeyboardArrowDown, Settings} from '@material-ui/icons';
import {CreateTemplate} from 'src/components/tables';
import {ConfirmationModal} from 'src/components/modals';

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
      lineHeight: '32px',
    },
    tabs: {
      minHeight: '40px',
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
      height: '42px',
      color: '#89AFF0',
    },
    spantext: {position: 'absolute'},
    spanMenu: {position: 'absolute', right: '0'},
    headerTop: {
      background: '#ffffff',
      marginTop: '15px',
      padding: '15px 15px',
      border: '1px solid #DBEBFC',
      borderRadius: '4px',
    },
    headtext: {
      fontSize: '16px',
      fontWeight: 500,
    },
    menuItem: {fontSize: '14px'},
    tabContent: {padding: '0px', marginTop: '15px'},
  })
);
const AntTabs = withStyles({
  root: {
    minHeight: '38px',
    '&>.MuiTabs-scroller>.MuiTabs-flexContainer': {
      borderBottom: '1px solid #ADCDF0',
      padding: '0px 30px',
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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const create: FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };
  const [openModal, setOpenModal] = React.useState(false);
  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <Box>
        <div style={{padding: '0 30px'}}>
          <Box display="flex" className={classes.headerTop}>
            <Box display="flex" alignItems="center">
              <Typography className={classes.headtext}>
                Create Template or &nbsp;
                <Button
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #ADCDF0',
                    fontWeight: 'bold',
                    color: '#4A90E2',
                    fontSize: '16px',
                    textTransform: 'none',
                    height: '34px',
                    borderRadius: '2px',
                  }}
                  className={classes.styledButton}
                >
                  Import &nbsp; <PublishIcon />
                </Button>
              </Typography>
            </Box>
            <Box ml="auto">
              <Grid container justify="space-around" alignItems="center">
                <Grid item>
                  <Grid container justify="space-between">
                    <Grid item>
                      <p className="form-label">Name</p>
                    </Grid>
                    <Grid item>
                      <TextField
                        className="text-field"
                        style={{
                          height: '0px',
                          fontSize: '12px',
                          color: '#666666',
                          marginRight: '8px',
                        }}
                        id="outlined-helperText"
                        placeholder="Name"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container justify="space-between">
                    <Grid item>
                      <p className="form-label">Sector</p>
                    </Grid>
                    <Grid item>
                      <FormControl variant="outlined">
                        <Select
                          style={{
                            width: '150px',
                            height: '40px',
                            fontSize: '12px',
                            color: '#666666',
                            marginRight: '8px',
                          }}
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={10}
                          //onChange={() => {}}
                        >
                          <MenuItem className="form-label" value={10}>
                            Sector
                          </MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container justify="space-between">
                    <Grid item>
                      <p className="form-label">Select type of Template</p>
                    </Grid>
                    <Grid item>
                      <FormControl variant="outlined">
                        <Select
                          style={{
                            width: '200px',
                            height: '40px',

                            fontSize: '12px',
                            color: '#666666',
                            marginRight: '8px',
                          }}
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={10}
                          // onChange={() => {}}
                        >
                          <MenuItem value={10}>Custom Template</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
        <div className={classes.tabContent}>
          <AppBar position="static" className={classes.appBar}>
            <AntTabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <AntTab label="Income Statement" {...a11yProps(0)} />
              <AntTab label="Balance Sheet" {...a11yProps(1)} className={classes.tab} />
              <AntTab
                label={
                  <>
                    <div>
                      <span>Add</span>&nbsp;
                      <KeyboardArrowDown
                        className={classes.spanMenu}
                        fontSize="small"
                        color="primary"
                      />
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
              <p className="sub-content-text" style={{marginLeft: 'auto', marginRight: '20px'}}>
                Last changes made by jason at 10:30 am
              </p>
              <Button onClick={handleClickOpenModal} className="filled-button" autoFocus>
                Save Changes
              </Button>
              <ConfirmationModal openModal={openModal} handleCloseModal={handleCloseModal} />
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
          <TabPanel value={value} index={0}>
            <CreateTemplate />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Balance sheet
          </TabPanel>
          <TabPanel value={value} index={2}>
            Add
          </TabPanel>
        </div>
      </Box>
    </>
  );
};
export default create;
