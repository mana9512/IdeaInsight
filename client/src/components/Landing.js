import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { search } from '../action/idea'
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
// import { withRouter } from 'react-router';
// import { addQuery, removeQuery } from '../utils/addparams';

const Landing = ({ search, searchfound }) => {



    const [formData, setFormData] = useState({
        name: "",
    });

    const { name } = formData;
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        search(name)

    };
    if (searchfound) {
        return <Redirect to="/idea" />;

    }
    return (
        <Fragment>
            <div class="s01">
                <form method="POST" onSubmit={(e) => onSubmit(e)}>
                    <fieldset>
                        <legend>Mk rocks mana shocks</legend>
                    </fieldset>
                    <div class="inner-form">
                        <div class="input-field first-wrap">
                            <input id="search" name="name" onChange={(e) => onChange(e)} type="text" placeholder="What are you looking for?" />
                        </div>

                        <div class="input-field third-wrap">
                            <button class="btn-search" type="submit" name="search" value="post">Search</button>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

Landing.propTypes = {

    search: PropTypes.func.isRequired,
    searchfound: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    searchfound: state.idea.searchfound,
});

export default connect(mapStateToProps, { search })(Landing)
