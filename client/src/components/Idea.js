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
      <div>
        {ideas.length > 0 ? (
          ideas.map((idea) => (
            <ul>
              <a href="#!">{idea.name}</a>
              <p>{idea.description}</p>
            </ul>
          ))
        ) : (
          <h4>Currently there are no ideas posted!</h4>
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
