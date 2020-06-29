import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { postIdeas } from "../action/idea";
import { connect } from "react-redux";
// import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../action/alert";

const PostIdea = ({ postIdeas, isAuthenticated, setAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    tag: [],
    description: "",
  });

  const { name, tag, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setAlert("You need to login to post an idea!", "danger");
    }
    postIdeas(name, tag, description);
  };

  return (
    <Fragment>
      <div className="container-idea jumbotron">
        <h1 className="large col-md-5 offset-1">Post your Ideas</h1>

        <div className="card col-md-5 offset-1" style={{ width: "100rem" }}>
          <div className="card-body">
            <form method="POST" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group col-md-10 offset-1">
                <span>Name:</span>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  id="formGroupExampleInput"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group col-md-10 offset-1">
                <span>Tag:</span>
                <input
                  type="text"
                  className="form-control"
                  name="tag"
                  value={tag}
                  id="formGroupExampleInput"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div class="form-group col-md-10 offset-1">
                <input
                  type="file"
                  class="form-control-file "
                  id="exampleFormControlFile1"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group green-border-focus col-md-10 offset-1">
                <span>Description</span>
                <textarea
                  className="form-control"
                  name="description"
                  value={description}
                  id="exampleFormControlTextarea5"
                  rows="3"
                  onChange={(e) => onChange(e)}
                ></textarea>
              </div>

              <div className="form-group form-button col-md-3 offset-1">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  className="form-submit"
                  value="Post"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

PostIdea.propTypes = {
  postIdeas: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { postIdeas, setAlert })(PostIdea);
