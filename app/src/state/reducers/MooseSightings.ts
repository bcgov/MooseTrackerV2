import {
  ACTIVITY_LOCATION_SET,
  USER_CLICK_ADD_MOOSE,
  USER_CLICK_RECORD_MOOSE,
  ACTIVITY_UPDATE_MOOSE,
  TOGGLE_SIGHTING_DIALOG,
  USER_UPDATE_SIGHTINGS,
  CLEAR_CURRENT_SIGHTING,
} from "../actions";
import { AppConfig } from "../config";

class MooseSightingState {
  recordingMooseInProgress: boolean;
  location: any;
  mooseArray: any[];
  sightings: any[];
  sightingDialogToggle: boolean;

  constructor() {
    this.location = "";
    this.recordingMooseInProgress = false;
    this.mooseArray = [];
    this.sightings = [];
    this.sightingDialogToggle = false;
  }
}
const initialState = new MooseSightingState();

function createMooseSightingStateReducer(
  configuration: AppConfig
): (arg0: MooseSightingState, AnyAction: any) => MooseSightingState {
  return (state = initialState, action) => {
    switch (action.type) {
      case USER_CLICK_ADD_MOOSE: {
        return {
          ...state,
          mooseArray: [
            ...state.mooseArray,
            {
              id: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1, //Julian's fancy random whole number
              age: null,
              gender: null,
            },
          ],
        };
      }
      case USER_CLICK_RECORD_MOOSE: {
        return {
          ...state,
          recordingMooseInProgress: true,
        };
      }
      case ACTIVITY_LOCATION_SET: {
        return {
          ...state,
          location: { ...action.payload },
        };
      }
      case ACTIVITY_UPDATE_MOOSE: {
        const id = action.payload?.id;
        const meese = state.mooseArray;
        const mooseIndex = meese.findIndex((moose) => {
          return moose.id === id;
        });
        if (mooseIndex === -1) return { ...state };

        const updatedMoose = {
          id: meese[mooseIndex].id,
          age: action.payload.age ? action.payload.age : meese[mooseIndex].age,
        };

        meese[mooseIndex] = updatedMoose;

        return {
          ...state,
          mooseArray: meese,
        };
      }
      case TOGGLE_SIGHTING_DIALOG: {
        return {
          ...state,
          sightingDialogToggle: !state.sightingDialogToggle,
        };
      }
      case USER_UPDATE_SIGHTINGS: {
        return {
          ...state,
          sightings: [...state.sightings, action.payload.sighting],
        };
      }
      case CLEAR_CURRENT_SIGHTING: {
        return {
          ...state,
          mooseArray: [],
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
