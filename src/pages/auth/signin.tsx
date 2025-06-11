import React from 'react';
// formik
// import {useFormik} from 'formik';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
// import {Paper, Button, TextField, Snackbar, IconButton} from '@material-ui/core';
// import {Close} from '@material-ui/icons';
// import {ISigninInputValues} from 'lib/types';
// import Alert from '@material-ui/lab/Alert';

// import AuthService from 'services/AuthService';
// cookie
// import cookie from 'js-cookie';
// import CookieService from "config/cookieService"
// import Router from 'next/router';
import {SignInForm} from 'src/components/forms';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '50px',
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 425,
    },
    input: {
      width: '100%',
    },
    signinBtn: {
      marginTop: '15px',
    },
    label: {
      fontSize: '14px',
      color: '#111111',
    },
    forgetPassword: {
      color: '#0091FF',
      fontSize: '12px',
      float: 'right',
    },
  })
);

// interface IformikDefination {
//   validateOnChange: boolean;
//   validate?: any;
//   handleSubmit: () => any;
//   handleChange: (data: string) => any;
//   values: ISigninInputValues;
//   errors: any;
//   resetForm: () => void;
// }
function SignIn() {
  const classes = useStyles();
  // const [openToaster, setOpenToaster] = React.useState(false);
  // const [toast, setToast] = React.useState({error: ''});
  // const handleToaster = () => {
  //   setOpenToaster(!openToaster);
  // };
  // const formik: IformikDefination = useFormik({
  //   initialValues: {
  //     username: '',
  //     password: '',
  //   },
  //   validateOnChange: false,
  //   onSubmit: (values) => {
  //     AuthService.login(values)
  //       .then((res) => {
  //         localStorage.setItem('token', res.token);
  //         localStorage.setItem('username', values.username);
  //         Router.push('/dashboard');
  //       })
  //       .catch(() => {
  //         setOpenToaster(true);
  //         setToast({error: 'Email / Password is Incorrect'});
  //       });
  //   },
  // });

  return (
    <div className={classes.root}>
      <SignInForm />
      {/* <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openToaster}
        autoHideDuration={4000}
        onClose={handleToaster}
      >
        <Alert
          severity="error"
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleToaster}>
                <Close fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
          {toast.error}
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <p
          className="main-content-text"
          style={{textAlign: 'center', color: '#0A376C', fontSize: '20px'}}
        >
          Welcome to factstream
        </p>
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
          <p className={classes.label}>User ID</p>
          <TextField
            className={classes.input}
            size="small"
            id="outlined-basic"
            variant="outlined"
            value={formik.values.username}
            onChange={formik.handleChange('username')}
          />
          <p className={classes.label}>Password</p>
          <TextField
            className={classes.input}
            size="small"
            type="password"
            id="outlined-basic"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange('password')}
          />
          <span className={classes.forgetPassword}>Forget password</span>
          <Button
            type="submit"
            className={`${classes.input} primary-btn ${classes.signinBtn}`}
            variant="contained"
          >
            Login
          </Button>
        </form>
      </Paper> */}
    </div>
  );
}
export default SignIn;
