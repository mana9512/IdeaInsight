import axios from 'axios'
import {SOLUTIONPOST_SUCCESS,SOLUTIONPOST_FAIL} from './types'


export const postSolutions = (description,link,id) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({description,link});
    console.log(id);
    
  
    try {
      const res = await axios.post(`http://localhost:5000/api/solution/${id}`,body, config);
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