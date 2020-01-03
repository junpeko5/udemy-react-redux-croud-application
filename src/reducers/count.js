import { INCREMENT, DECRIMENT } from '../actions';

const initialState = { value: 0 };

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { value: state.value + 1 };
    case DECRIMENT:
      return { value: state.value - 1 };
    default:
      return state;
  }
}