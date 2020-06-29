import axios from "axios";
import {
  IDEA_SUCCESS,
  IDEA_FAIL,
  IDEAPOST_FAIL,
  IDEAPOST_SUCCESS,
} from "./types";

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

export const postIdeas = (name, tag, description) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, tag, description });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/idea",
      body,
      config
    );
    dispatch({
      type: IDEAPOST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log("In catch");
    dispatch({
      type: IDEAPOST_FAIL,
    });
  }
};
