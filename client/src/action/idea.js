import axios from "axios";
import {
  IDEA_SUCCESS,
  IDEA_FAIL,
  IDEAPOST_FAIL,
  IDEAPOST_SUCCESS,
  SEARCH_FAIL,
  SEARCH_SUCCESS,
  ITEM_FAIL,
  ITEM_SUCCESS,
  DELIDEA_FAIL,
  DELIDEA_SUCCESS,
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

export const getIdeaById = (ideaId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/solution/${ideaId}`);

    dispatch({
      type: ITEM_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log("In catch");
    dispatch({
      type: ITEM_FAIL,
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
export const search = (name) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      name: name,
    },
  };
  try {
    const res = await axios.get(
      "http://localhost:5000/api/idea/search",
      config
    );

    dispatch({
      type: SEARCH_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log("In catch");
    dispatch({
      type: SEARCH_FAIL,
    });
  }
};

export const delIdeaById = (ideaId) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/idea/${ideaId}`);

    dispatch({
      type: DELIDEA_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    console.log("In catch");
    dispatch({
      type: ITEM_FAIL,
    });
  }
};
