import React from 'react';
// services
import AuthService from 'src/services/AuthService';
// // next router
// import Router from 'next/router';
// cookie
import cookie from 'js-cookie';
// formik
import {useFormik} from 'formik';
// types
import {ISigninInputValues} from 'src/lib/types';
// material Ui
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {Paper, Button, TextField, Snackbar, IconButton} from '@material-ui/core';
import {Close} from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
// import CookieService from "config/cookieService"
import {useHistory} from 'react-router-dom';

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

interface IformikDefination {
  validateOnChange: boolean;
  validate?: any;
  handleSubmit: () => any;
  handleChange: (data: string) => any;
  values: ISigninInputValues;
  errors: any;
  resetForm: () => void;
}

function SignInForm() {
  const classes = useStyles();
  const [openToaster, setOpenToaster] = React.useState(false);
  const [toast, setToast] = React.useState({error: ''});
  const handleToaster = () => {
    setOpenToaster(!openToaster);
  };
  const authService = new AuthService();
  const history = useHistory();
  // formik
  const formik: IformikDefination = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnChange: false,
    onSubmit: (values) => {
      AuthService.login(values)
        .then((res) => {
          authService.authenticateUser(res.token);
          cookie.set('username', values.username);
          // localStorage.setItem('token', res.token);
          // localStorage.setItem('username', values.username);
          // Router.push('/dashboard');
          history.push('/auth/signin');
        })
        .catch((err) => {
          console.log(err);

          setOpenToaster(true);
          setToast({error: 'Email / Password is Incorrect'});
        });
    },
  });
  React.useEffect(() => {
    if (cookie.get('accessToken')) {
      // Router.push('/dashboard');
      history.push('/');
    }
  });
  return (
    <div className={classes.root}>
      <Snackbar
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
      </Paper>
    </div>
  );
}
export default SignInForm;
