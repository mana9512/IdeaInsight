import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../action/solution";

const CommentForm = ({ solutionId, addComment }) => {
  const [text, setText] = useState("");

  return (
    <div className="post-form">
      {/* <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div> */}
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addComment(solutionId, { text });
          setText("");
        }}
      >
        <input
          name="text"
          placeholder="Add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ paddingTop: "20px" }}
          required
        />
        <input
          type="submit"
          style={{ width: "100px", height: "35px", marginTop: "5px" }}
          className="btn btn-dark"
          value="Comment"
        />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
