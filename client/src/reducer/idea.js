import { IDEA_SUCCESS, IDEA_FAIL,IDEAPOST_SUCCESS,IDEAPOST_FAIL,SEARCH_SUCCESS,SEARCH_FAIL,ITEM_SUCCESS,ITEM_FAIL } from "../action/types";

const initialState = {
  ideas: [],
  idea: null,
  searchResults:[],
  searchfound:null,
  k:[],
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
            searchfound:true,
            searchResults: payload,
          };
    case SEARCH_FAIL:
      return {
        ...state,
        searchfound:false,
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


    default:
      return state;
  }
}
