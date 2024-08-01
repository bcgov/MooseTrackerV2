import { Age } from "../../UI/Enums";
import {
  USER_CLICK_ADD_MOOSE,
  USER_CLICK_RECORD_MOOSE,
  USER_SAVE_SIGHTINGS,
  USER_SAVE_SIGHTINGS_SUCCESS,
  USER_SAVE_SIGHTINGS_FAIL,
  USER_CLOSE_SNACKBAR,
  SIGHTING_SYNC_SUCCESSFUL,
  MANUAL_REGION_CHOICE,
  MANUAL_SUBREGION_CHOICE,
  CLEAR_CURRENT_MOOSE_SIGHTING,
  ACTIVITY_UPDATE_SIGHTING
} from "../actions";
// import { ACTIVITY_UPDATE_MOOSE, ACTIVITY_UPDATE_SIGHTING } from "../actions/index";

import { AppConfig } from "../config";

class MooseSightingState {
  recordingMooseInProgress: boolean;
  region: string; 
  subRegion: string;
  mooseCount: number;
  tickHairLoss: number;
  dateFrom: Date;
  dateTo: Date;
  allSightings: any[];
  successSnackbarOpen: boolean;
  successSnackbarMessage: string;

  constructor() {
    this.recordingMooseInProgress = false;
    this.region = "";
    this.subRegion = "";
    this.mooseCount = 0;
    this.tickHairLoss = -1;
    this.dateFrom = new Date();
    this.dateTo = new Date();
    this.allSightings = localStorage.getItem("Sightings") ? JSON.parse(localStorage.getItem("Sightings")!) : [];
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
          ...state
        }
      }
      case USER_SAVE_SIGHTINGS_SUCCESS: {
        //const sightings  = state.allSightings? state.allSightings : [];
        console.log(state)
        return {
          ...state,
          allSightings: [
            ...state.allSightings,
            {
              region: state.region,
              subRegion: state.subRegion,
              mooseCount: state.mooseCount,
              tickHairLoss: state.tickHairLoss,
              dateFrom: state.dateFrom,
              dateTo: state.dateTo,
              id: crypto.randomUUID(),
              status: "Not Synced",
              syncDate: null,
            },
          ],
          successSnackbarOpen: true,
          successSnackbarMessage: "Moose sighting saved successfully."
        };
      }
      case USER_SAVE_SIGHTINGS_FAIL: {
        // TODO: replace alert() with snackbar
        return {
          ...state,
          successSnackbarOpen: true,
          successSnackbarMessage: JSON.stringify(action.payload.errors)
        }
      }
      case USER_CLOSE_SNACKBAR: {
        return {
          ...state,
          successSnackbarOpen: false,
          successSnackbarMessage: ""
        }
      }
      case ACTIVITY_UPDATE_SIGHTING: {
        return {
          ...state,
          mooseCount: action.payload.mooseCount ? action.payload.mooseCount : state.mooseCount,
          dateFrom:  action.payload.dateFrom ? action.payload.dateFrom : state.dateFrom,
          dateTo: action.payload.dateTo ? action.payload.dateTo : state.dateTo,
          region: action.payload.region ? action.payload.region : state.region,
          subRegion: action.payload.subRegion ? action.payload.subRegion : state.subRegion,
          tickHairLoss: action.payload.tickHairLoss ? action.payload.tickHairLoss : state.tickHairLoss
        }
      }
      case SIGHTING_SYNC_SUCCESSFUL: {
        return {
          ...state,
          allSightings: state.allSightings.map((sighting) => { return {...sighting, 'status':"Synced"} })
        }
      }
      case CLEAR_CURRENT_MOOSE_SIGHTING: {
        return {
          ...state,
          mooseCount: 1,
          startDate: new Date(),
          endDate: new Date(),
        }
      }
      default:
        return state;
    }
  };
}

const selectMooseSightingState: (state: any) => MooseSightingState = (state) =>
  state.MooseSightingState;

export { createMooseSightingStateReducer, selectMooseSightingState };
