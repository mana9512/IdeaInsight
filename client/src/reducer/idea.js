import { IDEA_SUCCESS, IDEA_FAIL } from "../action/types";

const initialState = {
  ideas: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case IDEA_SUCCESS:
      return {
        ...state,
        ideas: payload,
      };
    case IDEA_FAIL:
      return {
        ...state,
        ideas: [],
      };
    default:
      return state;
  }
}
