import React, {FC} from 'react';

import {
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@material-ui/core';

interface ConfirmationModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
}

const HirarchyModal: FC<ConfirmationModalProps> = (props) => {
  return (
    <>
      <Dialog
        open={props.openModal}
        onClose={props.handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{backgroundColor: '#4A90E2', color: 'white'}} id="alert-dialog-title">
          {'See Full Hirarchy'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container justify="space-between" spacing={2}>
              <Grid item>
                <p className="sub-content-text">Enter key word</p>
                <TextField
                  size="small"
                  id="outlined-helperText"
                  //   label="Helper text"
                  variant="outlined"
                />
              </Grid>
              <Grid item>=</Grid>
              <Grid item>
                <p className="sub-content-text">Full Hirarchy</p>
                <TextField
                  id="outlined-helperText"
                  //   label="Helper text"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button style={{width: ''}} onClick={props.handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button className="filled-button" onClick={props.handleCloseModal} autoFocus>
            Save Changes
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default HirarchyModal;
