import { 
  USER_SAVE_SIGHTINGS_SUCCESS, 
  USER_SAVE_SIGHTINGS_FAIL 
} from "../actions";

const uiReducer = (state = {}, action) => {
  switch (action.type) {
    case "SNACKBAR_SUCCESS":
      return {
        ...state,
        successSnackbarOpen: true,
        successSnackbarMessage: action.message
      };
    case "SNACKBAR_CLEAR":
      return {
        ...state,
        successSnackbarOpen: false,
        errorSnackbarOpen: false,
        infoSnackbarOpen: false
      };
    default:
      return state;
  }
};

export default uiReducer;