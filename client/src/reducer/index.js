import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import idea from "./idea";

export default combineReducers({ alert, auth, idea });
