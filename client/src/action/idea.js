import axios from "axios";
import { IDEA_SUCCESS, IDEA_FAIL } from "./types";

export const loadIdeas = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get("http://localhost:5000/api/idea", config);
    dispatch({
      type: IDEA_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log("In catch");
    dispatch({
      type: IDEA_FAIL,
    });
  }
};
