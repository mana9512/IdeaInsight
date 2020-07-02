import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { getIdeaById } from "../action/idea"


const IdeaItems = ({ match, getIdeaById, k }) => {

    // const listItems = k.tag.map((tags, index) =>
    //     <li key={index}>{tags}</li>
    // );

    useEffect(() => {
        getIdeaById(match.params.id)
    }, null);
    // getIdeaById(match.params.id)
    // console.log(typeof k.tag);
    // const tags=Object.values(k.tag)
    // const t=k.tag
    // console.log(t);
    
    // const tags=[...t]
    console.log(k);
    
    

    return (
        <Fragment>
            <div className="container-h col-lg-9 col-md-9 col-sm-9 col-xs-9 offset-1 float-md-center">
                <h1 className=" col-lg-9 col-md-9 col-sm-9 col-xs-9 offset-1 float-md-center" >{k.name}</h1>
                <hr className=" col-lg-9 col-md-9 col-sm-9 col-xs-9 offset-1 float-md-center"></hr>
                <p className="desc col-lg-9 col-md-9 col-sm-9 col-xs-9 offset-1 float-md-center" ><i class="fas fa-bug fa-lg" style={{ float: "left" }}></i><h3 className="offset-1" style={{ float: "left" }}>{k.description}</h3></p>
                <p>{k.tag}</p>
                
                {/* {k.tag.map((tags,index) => (
                        <div className = "tags-pill" key={index}>
                            {tags}
                        </div>
                    ))} */}
                

                {/* <div className="jumbotron jumbotron-fluid col-lg-9 col-md-9 col-sm-9 col-xs-9 offset-1 float-md-center">
                
            </div> */}
            </div>
        {/* <p>{k.map((tags,index) => (
                        <div key={index}>
                            {tags.solution}
                        </div>
                    ))}
                    </p> */}
        </Fragment>
    )
}

IdeaItems.propTypes = {
    getIdeaById: PropTypes.func.isRequired,
    k: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    k: state.idea.k
});

export default connect(mapStateToProps, { getIdeaById })(IdeaItems)
