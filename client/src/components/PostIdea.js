import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PostIdea = props => {
    return (
        <Fragment>
            <h1 className="large text-primary">Post your Ideas</h1>
            <form className="form">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name of your Idea"
                        name="idea"
                        // value={ide}
                    />
                    <small className="form-text">
                        Idea name is required
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Description"
                        name="description"
                        // value={description}
                        // onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        Description is required
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="textarea"
                        placeholder="Description"
                        name="description"
                        // value={description}
                    />
                    <small className="form-text">
                        Description is required
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Add your Tags"
                        name="tag"
                        // value={tag}
                    />
                </div>
            </form>
        
        </Fragment>
    )
}

PostIdea.propTypes = {

}

export default PostIdea
