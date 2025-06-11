import React, {FC} from 'react';
// clsx
import clsx from 'clsx';
// material UI
import {
  Drawer,
  makeStyles,
  createStyles,
  Theme,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Link,
} from '@material-ui/core';

// icons
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Inbox as InboxIcon,
  Home as HomeIcon,
  Description as DescriptionIcon,
} from '@material-ui/icons';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    miniDrawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: 0,
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      minHeight: '50px',
      padding: theme.spacing(0, 0),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    miniToolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      minHeight: '50px',
      padding: theme.spacing(0, 0),
      bottom: '50px',
      overflow: 'hidden',
      position: 'absolute',
      width: '60px',
      background: '#fff',
      zIndex: 2,
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    sidbarIcon: {
      paddingLeft: '23px',
    },
  })
);

export interface IDashboardSidebarProps {
  handleDrawerClose: () => void;
  handleDrawerMiniClose: () => void;
  open: boolean;
  miniDrawerOpen: boolean;
}
const DashboardSidebar: FC<IDashboardSidebarProps> = (props) => {
  // props spreading
  const {handleDrawerClose, handleDrawerMiniClose, open, miniDrawerOpen} = props;

  // styles
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
        [classes.miniDrawerClose]: miniDrawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
          [classes.miniDrawerClose]: miniDrawerOpen,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <List>
        {['Home', 'Starred', 'Send email'].map((text, index) => (
          <ListItem button key={text} className={classes.sidbarIcon}>
            <ListItemIcon>
              {index === 0 ? (
                <Link href="/dashboard">
                  <HomeIcon color="primary" />
                </Link>
              ) : index === 2 ? (
                <Link href="/create-template">
                  <DescriptionIcon color="primary" />
                </Link>
              ) : (
                <Link href="/dashboard/details">
                  <InboxIcon color="primary" />
                </Link>
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <div className={classes.miniToolbar}>
        <IconButton onClick={handleDrawerMiniClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
    </Drawer>
  );
};
export default DashboardSidebar;
