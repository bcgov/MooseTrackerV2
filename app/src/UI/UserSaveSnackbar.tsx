import { Snackbar, Button } from "@mui/material";
import { select } from "redux-saga/effects";

export const UserSaveSnackbar = () => {

  const snackbarState: any = yield select((state: any) => state.SnackbarState);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    snackbarState.isOpen = false;
  }

  return (
    <>
      <Button>Okay</Button>
      <Snackbar 
          message='Success or fail, meh' 
          autoHideDuration={4000} 
          open={snackbarState}
          onClose={handleClose}
      />
    </>
  )
}
