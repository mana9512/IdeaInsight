import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import {postSolutions} from '../action/solution'
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const PostSolution = ({postSolutions, isAuthenticated, match}) => {
 
  const [formData, setFormData] = useState({
    description:"",
    link:""
});

const { description,link } = formData;
const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit = (e) => {
        e.preventDefault();
        console.log(match.params.id);
        postSolutions(description,link,match.params.id)
      };
      
      // if (!isAuthenticated) {
      //   return <Redirect to="/login" />;
      // }

  return (
    <Fragment>
      <div className="container-idea">
      <h1 className="large col-md-5 offset-1">Post your Ideas</h1>


      <div className="card col-md-5 offset-1" style={{ width: "100rem" }}>
        <div className="card-body">

          <form method="POST" onSubmit={(e) => onSubmit(e)}>
            
            
            <div className="form-group col-md-10 offset-1">
              <span>Link:</span>
              <input type="text" className="form-control" name="link" value={link} id="formGroupExampleInput" onChange={(e) => onChange(e)} />
            </div>
            <div class="form-group col-md-10 offset-1">
              <input type="file" class="form-control-file "  id="exampleFormControlFile1" onChange={(e) => onChange(e)} />
            </div>
            <div className="form-group green-border-focus col-md-10 offset-1">
              <span>Description</span>
              <textarea className="form-control" name="description" value={description} id="exampleFormControlTextarea5" rows="3" onChange={(e) => onChange(e)}></textarea>
            </div>
            
            <div className="form-group form-button col-md-3 offset-1">
                                    <input type="submit" name="signin" id="signin" className="form-submit" value="Post" />
                                </div>
            
          </form>
        </div>
      </div>
      </div>
    </Fragment>
  )
}

PostSolution.propTypes = {
  postSolutions:PropTypes.func.isRequired,

}

const mapStateToProps = (state) => ({
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{postSolutions})(PostSolution)
