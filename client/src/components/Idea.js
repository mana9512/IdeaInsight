import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadIdeas } from "../action/idea";

const Idea = ({ loadIdeas, ideas }) => {
  useEffect(() => {
    loadIdeas();
  }, []);

  return (
    <Fragment>
      <div className="col-md-10 offset-sm-1  mt-5 border border-success pt-3">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search ......" aria-label="Recipient's username" />
          <div className="input-group-append">
            <span className="input-group-text"><i className="fa fa-search"></i></span>
          </div>
        </div>
      </div>
      <div className="col-lg-12 offset-md-1 mt-5">
        <h1>Search Results</h1>
      </div>
      <br/>
<hr className="style1 col-lg-10 offset-md-1  pt-3"/>
      <div>
        {ideas.length > 0 ? (
          ideas.map((idea) => (
            <ul>
              <i className="fas fa-lightbulb  fa-lg offset-md-1 pt-3"></i><a href="#!" className="style1 col-lg-10 pt-3">{idea.name}</a>
              <p className="style1 col-lg-10 offset-md-1 pt-3">{idea.description}</p>
              <hr className="style2 col-lg-10 offset-md-1  pt-3"/>

            </ul>
          ))
        ) : (
          <h4 className="style1 col-lg-10 offset-md-1  pt-3">Currently there are no ideas posted!</h4>
        )}
      </div>
    </Fragment>
  );
};

Idea.propTypes = {
  loadIdeas: PropTypes.func.isRequired,
  idea: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  ideas: state.idea.ideas,
});

export default connect(mapStateToProps, { loadIdeas })(Idea);
