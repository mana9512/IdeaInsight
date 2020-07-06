import {
  IDEA_SUCCESS,
  IDEA_FAIL,
  IDEAPOST_SUCCESS,
  IDEAPOST_FAIL,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  ITEM_SUCCESS,
  ITEM_FAIL,
  ADD_COMMENT,
  COMMENT_FAIL,
  REMOVE_COMMENT,
  DELIDEA_SUCCESS,
  DELSOL_SUCCESS,
} from "../action/types";

const initialState = {
  ideas: [],
  idea: null,
  searchResults: [],
  searchfound: null,
  k: [],
  error: {},
  del: false,
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
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchfound: true,
        searchResults: payload,
      };
    case SEARCH_FAIL:
      return {
        ...state,
        searchfound: false,
        searchResults: [],
      };
    case ITEM_SUCCESS:
      return {
        ...state,
        k: payload,
      };
    case ITEM_FAIL:
      return {
        ...state,
        k: [],
      };
    case DELIDEA_SUCCESS:
      return {
        ...state,
        k: [],
        del: true,
      };
    case DELSOL_SUCCESS:
      return {
        ...state,
        k: {
          ...state.k,
          solution: state.k.solution.filter((solu) => solu._id !== payload),
        },
        del: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        k: { ...state.k.solution, comments: payload },
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        k: {
          ...state.k.solution,
          comments: state.k.solution.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
      };
    case COMMENT_FAIL:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
