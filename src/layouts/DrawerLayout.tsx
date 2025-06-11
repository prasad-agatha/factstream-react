import React, {FC} from 'react';
// material  ui
import {makeStyles, createStyles, Theme, CssBaseline} from '@material-ui/core';
import {DashboardHeader, DashboardSidebar, DashboardFooter} from 'src/components/toolbars';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {display: 'flex'},
    content: {
      flexGrow: 1,
      // marginLeft: '70px',
      paddingTop: '50px',
      paddingBottom: '25px',
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

const DrawerLayout: FC = ({children}) => {
  const classes = useStyles();
  // states
  const [open, setOpen] = React.useState(false);
  const [miniDrawerOpen, setMiniDrawerOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
    setMiniDrawerOpen(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerMiniClose = () => {
    setMiniDrawerOpen(!miniDrawerOpen);
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <DashboardHeader open={open} handleDrawerOpen={handleDrawerOpen} />
      <DashboardSidebar
        open={open}
        miniDrawerOpen={miniDrawerOpen}
        handleDrawerMiniClose={handleDrawerMiniClose}
        handleDrawerClose={handleDrawerClose}
      />
      <main className={classes.content}>{children}</main>
      <DashboardFooter open={open} />
    </div>
  );
};

export default DrawerLayout;
