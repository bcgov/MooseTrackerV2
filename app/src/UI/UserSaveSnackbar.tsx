import { Snackbar, Button, Alert } from "@mui/material";
import "./UserSaveSnackbar.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { USER_CLOSE_SNACKBAR } from "../state/actions";
import { useEffect } from "react";

export const UserSaveSnackbar = () => {
  const successSnackbarMessage: string = useSelector((state: any) => state.MooseSightingsState.successSnackbarMessage);
  const successSnackbarOpen: boolean = useSelector((state: any) => state.MooseSightingsState.successSnackbarOpen);

  const dispatch = useDispatch();

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    dispatch({type: USER_CLOSE_SNACKBAR});
  }

  return (
      <Snackbar 
          message={successSnackbarMessage}
          autoHideDuration={4000} 
          open={successSnackbarOpen}
          onClose={handleClose}
        />
  )
}
