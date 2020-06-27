import { SOLUTIONPOST_SUCCESS,SOLUTIONPOST_FAIL } from "../action/types";

const initialState={
    solution :null

}
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case SOLUTIONPOST_SUCCESS:
        return {
          ...state,
          solution: payload,
        };
      case SOLUTIONPOST_FAIL:
        return {
          ...state,
          solution:null,
        };
  
      default:
        return state;
    }
  }
  

