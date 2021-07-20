import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { Dispatch } from 'react';

type Props = {
  title: string;
  body: string;
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  okCallback?: () => void;
};

export default function AlertDialog({
  title,
  body,
  open,
  setOpen,
  okCallback,
}: Props) {
  const handleClose = () => {
    setOpen(false);
    if (okCallback) {
      okCallback();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
