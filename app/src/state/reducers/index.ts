import { combineReducers } from 'redux';

import { AppConfig } from '../config';

import { createConfigurationReducerWithDefaultState } from './configuration';
import { createMooseSightingStateReducer } from './MooseSightings';

function createRootReducer(config: AppConfig) {
  return combineReducers({
    Configuration: createConfigurationReducerWithDefaultState(config),
    MooseSightingsState: createMooseSightingStateReducer(config)
  });
}

export { createRootReducer };

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
