import {
  USER_CLICK_RECORD_MOOSE,
  USER_SAVE_SIGHTINGS,
  USER_SAVE_SIGHTINGS_SUCCESS,
  USER_SAVE_SIGHTINGS_FAIL,
  USER_CLOSE_SNACKBAR,
  SIGHTING_SYNC_SUCCESSFUL,
  CLEAR_CURRENT_MOOSE_SIGHTING,
  ACTIVITY_UPDATE_SIGHTING,
} from "../actions";
import { MooseSighting } from "../../interfaces/interfaces";
// import { ACTIVITY_UPDATE_MOOSE, ACTIVITY_UPDATE_SIGHTING } from "../actions/index";

import { AppConfig } from "../config";

class MooseSightingState {
  recordingMooseInProgress: boolean;
  region: string;
  subRegion: string;
  bullCount: number;
  cowCount: number;
  calfCount: number;
  unknownCount: number;
  tickHairLoss: number;
  date: Date | null;
  hoursOut: number;
  allSightings: MooseSighting[];
  successSnackbarOpen: boolean;
  successSnackbarMessage: string;

  constructor() {
    this.recordingMooseInProgress = false;
    this.region = "";
    this.subRegion = "";
    this.bullCount = 0;
    this.cowCount = 0;
    this.calfCount = 0;
    this.unknownCount = 0;
    this.tickHairLoss = -1;
    this.date = new Date();
    this.hoursOut = 0;
    this.allSightings = localStorage.getItem("Sightings")
      ? JSON.parse(localStorage.getItem("Sightings")!)
      : [];
    this.successSnackbarMessage = "";
    this.successSnackbarOpen = false;
  }
}
const initialState = new MooseSightingState();

function createMooseSightingStateReducer(
  configuration: AppConfig
): (arg0: MooseSightingState, AnyAction: any) => MooseSightingState {
  return (state = initialState, action) => {
    switch (action.type) {
      // case USER_CLICK_ADD_MOOSE: {
      //   return {
      //     ...state,
      //     mooseArray: [
      //       ...state.mooseArray,
      //       {
      //         id: state.mooseArray.length + 1,
      //         age: Age.adult,
      //         gender: 'unknown',
      //       },
      //     ],
      //   };
      // }
      case USER_CLICK_RECORD_MOOSE: {
        return {
          ...state,
          recordingMooseInProgress: true,
        };
      }
      case USER_SAVE_SIGHTINGS: {
        return {
          ...state,
        };
      }
      case USER_SAVE_SIGHTINGS_SUCCESS: {
        console.log(state);
        return {
          ...state,
          allSightings: [
            ...state.allSightings,
            {
              region: state.region,
              subRegion: state.subRegion,
              bullCount: state.bullCount,
              cowCount: state.cowCount,
              calfCount: state.calfCount,
              unknownCount: state.unknownCount,
              tickHairLoss: state.tickHairLoss,
              date: state.date,
              hoursOut: state.hoursOut,
              id: crypto.randomUUID(),
              status: "Not Synced",
              syncDate: null,
            },
          ],
          successSnackbarOpen: true,
          successSnackbarMessage: "Moose sighting saved successfully.",
        };
      }
      case USER_SAVE_SIGHTINGS_FAIL: {
        // TODO: replace alert() with snackbar
        return {
          ...state,
          successSnackbarOpen: true,
          successSnackbarMessage: JSON.stringify(action.payload.errors),
        };
      }
      case USER_CLOSE_SNACKBAR: {
        return {
          ...state,
          successSnackbarOpen: false,
          successSnackbarMessage: "",
        };
      }
      case ACTIVITY_UPDATE_SIGHTING: {
        return {
          ...state,
          bullCount: action.payload.bullCount ?? state.bullCount,
          cowCount: action.payload.cowCount ?? state.cowCount,
          calfCount: action.payload.calfCount ?? state.calfCount,
          unknownCount: action.payload.unknownCount ?? state.unknownCount,
          date: action.payload.date ? action.payload.date : state.date,
          hoursOut: action.payload.hoursOut ?? state.hoursOut,
          region: action.payload.region ? action.payload.region : state.region,
          subRegion: action.payload.subRegion
            ? action.payload.subRegion
            : state.subRegion,
          tickHairLoss: action.payload.tickHairLoss ?? state.tickHairLoss,
        };
      }
      case SIGHTING_SYNC_SUCCESSFUL: {
        return {
          ...state,
          allSightings: state.allSightings.map((sighting) => {
            return { ...sighting, status: "Synced", syncDate: new Date() };
          }),
        };
      }
      case CLEAR_CURRENT_MOOSE_SIGHTING: {
        return {
          ...state,
          bullCount: 0,
          cowCount: 0,
          calfCount: 0,
          unknownCount: 0,
          // region: '',
          // subRegion: '',
          date: new Date(),
          hoursOut: 0,
        };
      }
      default:
        return state;
    }
  };
}

const selectMooseSightingState: (state: any) => MooseSightingState = (state) =>
  state.MooseSightingState;

export { createMooseSightingStateReducer, selectMooseSightingState };
