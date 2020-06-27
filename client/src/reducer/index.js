import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import idea from "./idea";
import solution from "./solution"

export default combineReducers({ alert, auth, idea, solution });
