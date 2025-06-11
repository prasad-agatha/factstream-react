import React, {FC} from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

interface ConfirmationModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = (props) => {
  return (
    <>
      <Dialog
        open={props.openModal}
        onClose={props.handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{backgroundColor: '#4A90E2', color: 'white'}} id="alert-dialog-title">
          {'Confirmation'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p className="main-content-text">
              Are you sure you want to commit changes?
              <br />
              <span className="sub-content-text">If you dont save, your changes will be lost.</span>
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{width: ''}} onClick={props.handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button className="filled-button" onClick={props.handleCloseModal} autoFocus>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationModal;
