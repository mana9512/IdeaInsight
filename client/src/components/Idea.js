import React, { Fragment, useEffect,useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadIdeas, search } from "../action/idea";
import { Link } from "react-router-dom";

const Idea = ({ search,loadIdeas, ideas, searchResults }) => {
  // useEffect(() => {
  //   searchResults
  //   // loadIdeas();
  // }, []);
  const [formData, setFormData] = useState({
    name: "",
    
});

const { name } = formData;
const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit = (e) => {
        e.preventDefault();
    //    addQuery('name', name)
        search(name)

      };
  return (
    <Fragment>
      <form method="POST" onSubmit={(e) => onSubmit(e)}>
      <div className="col-md-10 offset-sm-1  mt-5 border border-success pt-3">
        <div className="input-group mb-3">
          <input type="text" className="form-control" name="name" placeholder="Search ......" onChange={(e) => onChange(e)} aria-label="Recipient's username" />
          <div className="input-group-append">
            <span className="input-group-text"><button type="submit" name="name" value="post" className="fa fa-search"></button></span>
          </div>
        </div>
      </div>
      </form>
      <div className="col-lg-12 offset-md-1 mt-5">
        <h1>Search Results</h1>
      </div>
      <br/>
<hr className="style1 col-lg-10 offset-md-1  pt-3"/>
      <div>
        {searchResults.length > 0 ? (
          searchResults.map((idea) => (
            <ul>
              <i className="fas fa-lightbulb  fa-lg offset-md-1 pt-3"></i>
              <Link to={`idea/${idea._id}`} className="style1 col-lg-10 pt-3">
                {idea.name}
              </Link>
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
  // loadIdeas: PropTypes.func.isRequired,
  // idea: PropTypes.array.isRequired,
  search:PropTypes.func.isRequired,
  searchResults: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  // ideas: state.idea.ideas,
  searchResults:state.idea.searchResults
});

export default connect(mapStateToProps, { loadIdeas ,search})(Idea);
