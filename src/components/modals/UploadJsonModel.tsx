import React, {FC} from 'react';
import Ajv from 'ajv';
//material ui
import {
  Grid,
  FormControl,
  Typography,
  InputAdornment,
  OutlinedInput,
  FormHelperText,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from '@material-ui/core';
import {Close, Publish} from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';

interface UploadJsonModalProps {
  openModal: boolean;
  handleUploadModel: () => void;
  handleTableData: (data: any) => any;
}

const UploadJsonModal: FC<UploadJsonModalProps> = (props) => {
  const {openModal, handleUploadModel, handleTableData} = props;
  const [jsonData, setJsonData] = React.useState<any>(null);
  const [openToaster, setOpenToaster] = React.useState(false);

  const handleToaster = () => {
    setOpenToaster(!openToaster);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const ajv = new Ajv();
    //Validation Rule
    const validateSchema = {
      title: 'ValidationExample',
      type: 'object',
      properties: {
        company_name: {type: 'string'},
        source: {type: 'string'},
        tables: {type: 'array'},
      },
    };

    const valid = ajv.validate(validateSchema, jsonData);
    if (valid) {
      handleUploadModel();
      handleTableData(jsonData);
    } else {
      setOpenToaster(true);
    }
  };

  const handleUpload = (event: any) => {
    const files = event.target.files;
    const file = files[0];

    const reader = new FileReader();
    reader.onload = function (e: any) {
      setJsonData(JSON.parse(e.target.result));
    };
    reader.readAsText(file);
  };

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
          Invalid Json!
        </Alert>
      </Snackbar>
      <Dialog
        open={openModal}
        onClose={handleUploadModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-form pb-3"
      >
        <DialogTitle id="form-dialog-title" className="popupTitle">
          <Typography variant="h6">Upload Json</Typography>
          <IconButton aria-label="close" className="closeButton" onClick={handleUploadModel}>
            <Close style={{color: 'white'}} />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <DialogContent>
            <div className="mt-2">
              <Grid className="mb-2" container>
                <Grid item xs={12}>
                  <FormControl className="inputForm">
                    <FormHelperText id="outlined-weight-helper-text">Upload File</FormHelperText>
                    <OutlinedInput
                      type="file"
                      id="outlined-adornment-weight"
                      endAdornment={
                        <InputAdornment position="end">
                          <Publish color="primary" />
                        </InputAdornment>
                      }
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                      labelWidth={0}
                      onChange={handleUpload}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <hr className="hrRow" />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              style={{width: ''}}
              className="secondary-btn"
              onClick={handleUploadModel}
              color="primary"
            >
              Cancel
            </Button>
            <Button type="submit" className="primary-btn" autoFocus>
              Upload
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default UploadJsonModal;
