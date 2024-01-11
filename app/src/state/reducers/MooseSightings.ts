import { Age } from "../../UI/Enums";
import {
  ACTIVITY_DELETE_MOOSE,
  ACTIVITY_LOCATION_SET,
  USER_CLICK_ADD_MOOSE,
  USER_CLICK_RECORD_MOOSE,
  ACTIVITY_CLEAR_MOOSE_ARRAY
} from "../actions";
import { ACTIVITY_UPDATE_MOOSE } from "../actions/index";

import { AppConfig } from "../config";

class MooseSightingState {
  recordingMooseInProgress: boolean;
  location: any;
  mooseArray: any[];

  constructor() {
    this.location = "";
    this.recordingMooseInProgress = false;
    this.mooseArray = [];
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
              id: state.mooseArray.length + 1,
              age: Age.adult,
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
        const meese = [...state.mooseArray];
        const mooseIndex = meese.findIndex((moose) => moose.id === id);
        if (mooseIndex === -1) return { ...state };

        const updatedMoose = {
          ...meese[mooseIndex],
          age: action.payload.age ?? meese[mooseIndex].age,
          gender: action.payload.gender ?? meese[mooseIndex].gender,
        };

        meese[mooseIndex] = updatedMoose;

        return {
          ...state,
          mooseArray: meese,
        };
      }
      case ACTIVITY_DELETE_MOOSE: {
        const id = action.payload?.id;
        let meese = [...state.mooseArray];

        meese.splice(id - 1, 1);
        
        meese = meese.map((moose, index) => {
          return {
            ...moose,
            id: index + 1
          };
        });

        return {
          ...state,
          mooseArray: meese
        }
      }
      case ACTIVITY_CLEAR_MOOSE_ARRAY: {
        return {
          ...state,
          mooseArray: []
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
