import React, {FC} from 'react';
// clsx
import clsx from 'clsx';
// next
import {Link} from 'react-router-dom';
// router
// import Router from 'next/router';
import {useHistory} from 'react-router-dom';
// services
import AuthService from 'src/services/AuthService';
// cookie
import cookie from 'js-cookie';
// material ui
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  createStyles,
  Theme,
  Box,
  Menu,
  MenuItem,
  Badge,
  InputBase,
  InputAdornment,
} from '@material-ui/core';
import {fade} from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {KeyboardArrowDown, KeyboardArrowUp, Search, Home as HomeIcon} from '@material-ui/icons';

const drawerWidth = 240;
const authService = new AuthService();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      boxShadow: 'none',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    search: {
      padding: '0 12px',
      position: 'relative',
      minHeight: '50px',
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      width: '100%',
      borderLeft: '1px solid rgba(255,255,255,0.2)',
      [theme.breakpoints.up('sm')]: {
        marginLeft: 'auto',
        width: 'auto',
      },
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '8ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      marginLeft: 'auto',
      width: 'auto',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
    },
    sectionMobile: {
      display: 'flex',
      marginLeft: 'auto',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    menuItem: {fontSize: '14px'},
  })
);

export interface IDashboardHeaderProps {
  handleDrawerOpen?: () => void;
  open?: boolean;
}

const DashboardHeader: FC<IDashboardHeaderProps> = (props) => {
  // props speading
  const {open} = props;
  const [profileMenu, setProfileMenu] = React.useState(null);
  const [userName, setuserName] = React.useState(null);

  const history = useHistory();
  const classes = useStyles();
  const menuId = 'primary-search-account-menu';

  React.useEffect(() => {
    if (cookie.get('accessToken') && cookie.get('username')) {
      setuserName(cookie.get('username'));
    } else {
      // Router.push('/auth/signin');
      history.push('/auth/signin');
    }
  });
  const handleMenu = (event: any) => {
    setProfileMenu(event.currentTarget);
  };
  const handleClose = () => {
    setProfileMenu(null);
  };
  const handleLogout = () => {
    cookie.remove('accessToken');
    authService.logout();
    history.push('/auth/signin');
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar className="menuToolbar">
        {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            hide: open,
          })}
        >
          <MenuIcon />
        </IconButton> */}
        <div style={{display: 'flex', justifyContent: 'flex-start'}}>
          <Link to={'/'}>
            <a style={{color: '#fff', paddingRight: '16px'}}>
              <HomeIcon />
            </a>
          </Link>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-start'}}>
          <Link to={'/'}>
            <a>
              <img
                src="https://raw.githubusercontent.com/soulpage/image-assets/master/factsream_logo.JPG"
                className="logo"
              ></img>
            </a>
          </Link>
        </div>

        <div className={classes.sectionDesktop}>
          <Box className={classes.search} display="flex" alignItems="center">
            {/* <div className="searchIcon">
              <SearchIcon />
            </div> */}
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              endAdornment={
                <InputAdornment position="end">
                  <Search className="iconColor" />
                </InputAdornment>
              }
            />
          </Box>
          <Box className="notification" display="flex" alignItems="center">
            <IconButton
              aria-label="show 3 new notifications"
              color="inherit"
              style={{padding: '0 12px'}}
            >
              <Badge badgeContent={3} color="primary" className="badge">
                <NotificationsIcon className="notificationIcon" />
              </Badge>
            </IconButton>
          </Box>
          <Box className="userInfo">
            <div className="content-justify">
              <img src="/user.png" className="userImage"></img>
            </div>
            <div className="content-justify">
              <span className="user"> Welcome {userName}</span>
            </div>
            <div className="content-justify">
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={{padding: '0 5px', color: '#ADCDF0'}}
              >
                {profileMenu ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            </div>
            <Menu
              id="simple-menu"
              anchorEl={profileMenu}
              keepMounted
              open={Boolean(profileMenu)}
              onClose={handleClose}
              elevation={1}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem className={classes.menuItem}>My Account</MenuItem>
              <MenuItem className={classes.menuItem} onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton aria-label="show more" aria-haspopup="true" color="inherit">
            <MoreIcon className="iconColor" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
