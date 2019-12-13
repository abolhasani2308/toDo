import * as Action from "../Action";

const INITIAL_STATE = {
  count: 0
};

export const CounterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Action.INCREASE:
      return {
        ...state,
        count: state.count + action.step
      };

    case Action.DECREASE:
      return {
        ...state,
        count: state.count - action.step
      };

    default:
      return state;
  }
};
