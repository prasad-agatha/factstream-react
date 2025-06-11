import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '50px',
      fontFamily: 'Nunito,sans-serif',
    },
    paper: {
      padding: theme.spacing(3),
      margin: 'auto',
      maxWidth: 425,
    },
    input: {
      width: '100%',
      fontFamily: 'Nunito,sans-serif',
    },
    signinBtn: {
      marginTop: '15px',
    },
    label: {
      fontSize: '14px',
      color: '#111111',
    },
    subText: {
      color: '#333333',
      fontSize: '13px',
      textAlign: 'center',
    },
  })
);
function setPassword() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <p
          className="main-content-text"
          style={{textAlign: 'center', color: '#333333', fontSize: '20px'}}
        >
          Set New Password
        </p>
        <p className={classes.label}>New Password</p>
        <TextField className={classes.input} size="small" id="outlined-basic" variant="outlined" />
        <p className={classes.label}>Confirm new password</p>
        <TextField
          className={classes.input}
          size="small"
          type="password"
          id="outlined-basic"
          variant="outlined"
        />
        <Button className={`${classes.input} primary-btn ${classes.signinBtn}`} variant="contained">
          Continue
        </Button>
      </Paper>
    </div>
  );
}
export default setPassword;
