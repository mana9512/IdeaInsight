import axios from "axios";
import {
  SOLUTIONPOST_SUCCESS,
  SOLUTIONPOST_FAIL,
  ADD_COMMENT,
  COMMENT_FAIL,
  REMOVE_COMMENT,
  DELSOL_SUCCESS,
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

// Delete comment
export const deleteComment = (solutionId, commentId) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/solution/comment/${solutionId}/${commentId}`
    );

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    console.log(err);

    // dispatch({
    //   type: COMMENT_FAIL,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};

export const delSolutionById = (id, solutionId) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/solution/${id}/${solutionId}`
    );

    dispatch({
      type: DELSOL_SUCCESS,
      payload: solutionId,
    });
  } catch (err) {
    console.log(err);
    console.log("In catch");
    // dispatch({
    //   type: ITEM_FAIL,
    // });
  }
};
