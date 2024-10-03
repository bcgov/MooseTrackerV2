import { AppConfig } from '../config';

interface ConfigurationState {
  current: AppConfig;
  selectedMapLayer: string;
}

function createConfigurationReducerWithDefaultState(configuration: AppConfig) {
  const initialState: ConfigurationState = {
    current: configuration,
    selectedMapLayer: 'default',
  };

  return (state = initialState, action) => {
    switch (action.type) {
      case "SET_SELECTED_MAP_LAYER":
        return {
          ...state,
          selectedMapLayer: action.payload,
        };
      default:
        return state;
    }
  };
}

const selectConfiguration: (state) => AppConfig = (state) => state.Configuration.current;

export { createConfigurationReducerWithDefaultState, selectConfiguration };
