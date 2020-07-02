import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getIdeaById } from "../action/idea";

const IdeaItems = ({
  match,
  getIdeaById,
  k: { tag = [], name, description, solution = [] },
}) => {
  useEffect(() => {
    getIdeaById(match.params.id);
  }, null);
  console.log(tag.length);
  return (
    <Fragment>
      <div className="container-h col-lg-9 col-md-9 col-sm-9 col-xs-9 offset-1 float-md-center">
        <h1 className=" col-lg-9 col-md-9 col-sm-9 col-xs-9 offset-1 float-md-center">
          {name}
        </h1>
        <hr className=" col-lg-9 col-md-9 col-sm-9 col-xs-9 offset-1 float-md-center"></hr>
        <p className="desc col-lg-9 col-md-9 col-sm-9 col-xs-9 offset-1 float-md-center">
          <i class="fas fa-bug fa-lg" style={{ float: "left" }}></i>
          <h3 className="offset-1" style={{ float: "left" }}>
            {description}
          </h3>
        </p>

        {tag.map((tags, index) => (
          <div className="tags-pill" key={index}>
            {tags}
          </div>
        ))}

        {solution.map((solu) => (
          <div key={solu._id}>{solu.description}</div>
        ))}

        {/* <div className="jumbotron jumbotron-fluid col-lg-9 col-md-9 col-sm-9 col-xs-9 offset-1 float-md-center">
                
            </div> */}
      </div>
    </Fragment>
  );
};

IdeaItems.propTypes = {
  getIdeaById: PropTypes.func.isRequired,
  k: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  k: state.idea.k,
});

export default connect(mapStateToProps, { getIdeaById })(IdeaItems);
