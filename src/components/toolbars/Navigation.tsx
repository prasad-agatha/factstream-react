import React, {FC} from 'react';
// material ui
import {makeStyles, AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
// icons
import {Menu as MenuIcon} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavigationBar: FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar style={{background: 'linear-gradient(180deg, #0B488F 0%, #0A376C 100%)'}}>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <img
            src="https://raw.githubusercontent.com/soulpage/image-assets/master/factsream_logo.JPG"
            className="logo"
          ></img>
        </Typography>
        {/* <Button color="inherit">Login</Button>
        <Button color="inherit">Register</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
