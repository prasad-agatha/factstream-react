import React, {FC} from 'react';
// clsx
import clsx from 'clsx';
//material ui
import {createStyles, fade, Theme, withStyles} from '@material-ui/core/styles';
import {
  Box,
  Grid,
  FormControl,
  Typography,
  InputAdornment,
  OutlinedInput,
  InputBase,
  InputLabel,
  FormHelperText,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
} from '@material-ui/core';
import {Close, Publish, CheckCircle, AddCircle} from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
// Components
import {TermSelector, PeriodSelector} from 'src/components/lookup';
import {IFilingInputValues} from 'src/lib/types';
import {FilingValidation} from 'src/lib/validation';
// Formik
import {useFormik} from 'formik';
import {APIPusher} from 'src/lib/service';
import {FILINGS, MEDIA} from 'src/lib/constants/endpoints';

const FormInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
      borderRadius: 4,
      border: '1px solid #ced4da',
      '&.Mui-error': {
        borderColor: 'red',
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      fontSize: 16,
      width: '100%',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  })
)(InputBase);

const initialValues: IFilingInputValues = {
  file: '',
  term: '',
  period: '',
  quarterly: '',
};
interface IFormikDefination {
  initialValues: typeof initialValues;
  validateOnChange: boolean;
  validate?: any;
  handleSubmit: () => any;
  handleChange: (data: string) => any;
  values: IFilingInputValues;
  errors: any;
  resetForm: () => void;
}
interface AddFilingModalProps {
  openModal: boolean;
  handleCloseModel: () => any;
  companyDetail: any;
}

const AddFilingModal: FC<AddFilingModalProps> = (props) => {
  const {openModal, handleCloseModel, companyDetail} = props;
  const [openToaster, setOpenToaster] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // console.log(companyDetail);

  const formik: IFormikDefination = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validate: FilingValidation,
    onSubmit: (values: IFilingInputValues) => {
      setLoading(true);
      // console.log(values);
      const files_data: any = new FormData();
      files_data.append('file', values.file);
      files_data.append('name', values.file.name);

      APIPusher(MEDIA, files_data)
        .then((res) => {
          // console.log(res);

          const filing_data: any = new FormData();
          filing_data.append('term', values.term);
          filing_data.append('period', values.period);
          filing_data.append('quarterly', values.quarterly);
          filing_data.append('cdnpath', res.file);
          filing_data.append('media', res.id);
          filing_data.append('filedisplayname', values.file.name);
          filing_data.append('companyid', companyDetail.companyid);

          APIPusher(FILINGS, filing_data).then(() => {
            // console.log(res);
            setShowSuccess(true);
            setLoading(false);
            formik.resetForm();
          });
        })
        .catch(() => {
          // console.log(error);
        });
    },
  });

  const handleToaster = () => {
    setOpenToaster(!openToaster);
  };

  const handleUploadFile = (event: any) => {
    const fileInput: any = document.getElementById('file');
    const filePath = event.target.value;

    // Allowing file type
    const allowedExtensions = /(\.pdf|\.html|\.json)$/i;

    if (!allowedExtensions.exec(filePath)) {
      setOpenToaster(true);
      fileInput.value = null;
      return true;
    } else {
      // setUploadRef(event.target.files[0]);
      formik.values.file = event.target.files[0];
      // const reader = new FileReader();
      // reader.onload = function (event: any) {
      //   formik.values.file = event.target.result;
      // };
      // reader.readAsDataURL(file);
    }
  };

  const SuccessMessage = () => {
    return (
      <>
        <Card>
          <CardContent>
            <Box justifyContent="center">
              <Box display="flex" justifyContent="center" className="mt-3 mb-3">
                <CheckCircle style={{color: '#7EC17B', fontSize: '150px'}} />
              </Box>
              <Box display="flex" justifyContent="center" className="mt-3 mb-3">
                <Typography className="success-text">Filing processed Successfully!</Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" className="w-100 pb-4">
              <Button
                variant="outlined"
                size="large"
                className="roundButton"
                onClick={() => {
                  handleCloseModel();
                  setShowSuccess(false);
                }}
              >
                Close
              </Button>
            </Box>
          </CardActions>
        </Card>
      </>
    );
  };

  const uploadAnotherFiling = () => void {};

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
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
          Invalid File Type
        </Alert>
      </Snackbar>
      <Dialog
        open={openModal}
        onClose={handleCloseModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-form pb-3"
      >
        {showSuccess ? (
          <SuccessMessage />
        ) : (
          <>
            <DialogTitle id="form-dialog-title" className="popupTitle">
              <Typography variant="h6">Create Filing for {companyDetail.name}</Typography>
              <IconButton aria-label="close" className="closeButton" onClick={handleCloseModel}>
                <Close style={{color: 'white'}} />
              </IconButton>
            </DialogTitle>
            <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
              <DialogContent>
                <div className="mt-2">
                  <Grid className="mb-2" container>
                    <Grid item xs={12}>
                      <FormControl className="inputForm">
                        <FormHelperText id="outlined-weight-helper-text">
                          Select File
                        </FormHelperText>
                        <OutlinedInput
                          className="fileInput"
                          type="file"
                          id="file"
                          endAdornment={
                            <InputAdornment position="end">
                              <Publish color="primary" />
                            </InputAdornment>
                          }
                          labelWidth={0}
                          onChange={handleUploadFile}
                          error={formik.errors.file}
                        />
                        {formik.errors.file ? (
                          <FormHelperText error>{formik.errors.file}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid className="mb-4" container>
                    <Grid item xs={4}>
                      <Box pr={2}>
                        <TermSelector
                          value={formik.values.term}
                          handleTerm={formik.handleChange('term')}
                          error={formik.errors.term}
                        />
                        {formik.errors.term ? (
                          <FormHelperText error>{formik.errors.term}</FormHelperText>
                        ) : null}
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box pr={2}>
                        <PeriodSelector
                          value={formik.values.period}
                          handlePeriod={formik.handleChange('period')}
                          error={formik.errors.period}
                        />
                        {formik.errors.period ? (
                          <FormHelperText error>{formik.errors.period}</FormHelperText>
                        ) : null}
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      {/* <QuaterlySelector
                        value={formik.values.quarterly}
                        handleQuaterly={formik.handleChange('quarterly')}
                        error={formik.errors.quarterly}
                      />
                      {formik.errors.quarterly ? (
                        <FormHelperText error>{formik.errors.quarterly}</FormHelperText>
                      ) : null} */}
                      <FormControl className="inputForm">
                        <InputLabel shrink htmlFor="bootstrap-input">
                          Quaterly
                        </InputLabel>
                        <FormInput
                          value={formik.values.quarterly}
                          onChange={formik.handleChange('quarterly')}
                          error={formik.errors.quarterly}
                        />
                        {formik.errors.quarterly ? (
                          <FormHelperText error>{formik.errors.quarterly}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <hr className="hrRow" />
                </div>
                <Box>
                  <Typography align="right">
                    <Button size="small" color="primary" onClick={uploadAnotherFiling}>
                      <AddCircle fontSize="small" />
                      &nbsp;Upload another filing
                    </Button>
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions>
                <div className="actionDiv">
                  <Grid container>
                    <Grid item xs={4}>
                      <Button
                        size="small"
                        variant="contained"
                        className="secondary-btn"
                        onClick={handleCloseModel}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography align="right" style={{position: 'relative'}}>
                        <Button
                          type="submit"
                          size="small"
                          variant="contained"
                          className={clsx('primary-btn', {['primary-btn-disabled']: loading})}
                          color="primary"
                          disabled={loading}
                        >
                          Save & Close
                        </Button>
                        {loading && <CircularProgress size={24} className="buttonProgress" />}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </DialogActions>
            </form>
          </>
        )}
      </Dialog>
    </>
  );
};

export default AddFilingModal;
