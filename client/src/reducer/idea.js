import { IDEA_SUCCESS, IDEA_FAIL,IDEAPOST_SUCCESS,IDEAPOST_FAIL } from "../action/types";

const initialState = {
  ideas: [],
  idea: null
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
    case IDEAPOST_SUCCESS:
      return {
        ...state,
        idea: payload,
      };
    case IDEAPOST_FAIL:
        return {
          ...state,
          idea: null,
        };

    default:
      return state;
  }
}
