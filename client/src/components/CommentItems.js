import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../action/solution";

const CommentItem = ({
  Id,
  comment: { _id, text, name, user, date },
  auth,
  deleteComment,
}) => (
  <div className="post bg-white p-1 my-1">
    {/* <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
       </Link>
    </div> */}
    <div>
      <hr />
      <span>{text} --- </span>
      <span style={{ marginLeft: "10px" }}>
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment> by {name}
      </span>
      {auth.user === null ? (
        <Fragment></Fragment>
      ) : (
        user === auth.user._id && (
          <span style={{ marginLeft: "10px" }}>
            <i
              class="fas fa-trash fa-sm"
              style={{ color: "black", float: "right" }}
              type="button"
              onClick={() => deleteComment(Id, _id)}
            ></i>
          </span>
        )
      )}
      {/* {user === auth.user._id && (
        <span style={{ marginLeft: "10px" }}>
          <i
            class="fas fa-trash fa-sm"
            style={{ color: "black", float: "right" }}
            type="button"
            // onClick={() => deleteComment(postId, _id)}
          ></i>
        </span>
      )} */}
    </div>
  </div>
);

CommentItem.propTypes = {
  solutionId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
