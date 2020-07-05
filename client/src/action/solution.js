import axios from "axios";
import {
  SOLUTIONPOST_SUCCESS,
  SOLUTIONPOST_FAIL,
  ADD_COMMENT,
  COMMENT_FAIL,
} from "./types";
import { setAlert } from "./alert";

export const postSolutions = (description, link, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ description, link });
  console.log(id);

  try {
    const res = await axios.post(
      `http://localhost:5000/api/solution/${id}`,
      body,
      config
    );
    dispatch({
      type: SOLUTIONPOST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log("In catch");
    dispatch({
      type: SOLUTIONPOST_FAIL,
    });
  }
};

// Add comment
export const addComment = (solutionId, formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/solution/comment/${solutionId}`,
      formData
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: COMMENT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
