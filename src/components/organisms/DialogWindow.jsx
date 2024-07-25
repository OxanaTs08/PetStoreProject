import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  DialogContentText,
} from '@mui/material';

const DialogWindow = ({ WindowText, handleClose, open }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(13, 80, 255, 1)',
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: 'rgba(13, 80, 255, 1)',
            color: 'rgba(255, 255, 255, 1)',
          }}
          id="alert-dialog-title"
        >
          {'Congratulations!'}
        </DialogTitle>
        <DialogActions sx={{ backgroundColor: 'rgba(13, 80, 255, 1)' }}>
          <Button
            sx={{ color: 'rgba(255, 255, 255, 1)' }}
            onClick={handleClose}
          >
            x
          </Button>
        </DialogActions>
      </Stack>
      <DialogContent sx={{ backgroundColor: 'rgba(13, 80, 255, 1)' }}>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ color: 'rgba(255, 255, 255, 1)' }}
        >
          {WindowText}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default DialogWindow;
