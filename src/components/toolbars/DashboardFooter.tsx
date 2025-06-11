import React, {FC} from 'react';
// clsx
import clsx from 'clsx';
// material Ui
import {Box} from '@material-ui/core';
import {makeStyles, createStyles, Theme} from '@material-ui/core';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    footerBar: {
      boxShadow: 'none',
      background: '#ffffff',
      borderTop: '1px solid #ADCDF0',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      position: 'fixed',
      bottom: 0,
      width: '100%',
      paddingLeft: '100px',
      paddingRight: '32px',
    },
    footerBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      position: 'fixed',
      bottom: 0,
      paddingLeft: '32px',
    },
  })
);

export interface IDashboardFooterProps {
  open: boolean;
}

const DashboardFooter: FC<IDashboardFooterProps> = (props) => {
  // props speading
  const {open} = props;
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.footerBar, {
        [classes.footerBarShift]: open,
      })}
    >
      <Box display="flex">
        <Box>
          <p className="sub-content-text" style={{color: '#666666'}}>
            2020 All Rights Reserved By Almug. Terms and Conditions. Privacy Policy
          </p>
        </Box>
        <Box ml="auto">
          <p className="sub-content-text" style={{color: '#666666', textAlign: 'center'}}>
            Powered by almug
          </p>
        </Box>
      </Box>
    </div>
  );
};

export default DashboardFooter;
