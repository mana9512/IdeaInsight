import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { getIdeaById } from "../action/idea"


const IdeaItems = ( { match, getIdeaById ,k} ) => {

    useEffect(() => {
        getIdeaById(match.params.id)
        }, []);
   
    return (
        <Fragment>
            <h1>{k.name}</h1>
            <p><h3>{k.description}</h3></p>
        </Fragment>
    )
}

IdeaItems.propTypes = {
    getIdeaById:PropTypes.func.isRequired,
    k:PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    k:state.idea.k
  });

export default connect(mapStateToProps, { getIdeaById })(IdeaItems)
