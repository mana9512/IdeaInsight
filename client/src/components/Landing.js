import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Landing = props => {
    return (
        <Fragment>
        <div class="s01">
            <form>
                <fieldset>
                    <legend>Mk rocks mana shocks</legend>
                </fieldset>
                <div class="inner-form">
                    <div class="input-field first-wrap">
                        <input id="search" type="text" placeholder="What are you looking for?" />
                    </div>
                    
                    <div class="input-field third-wrap">
                        <button class="btn-search" type="button">Search</button>
                    </div>
                </div>
            </form>
        </div>
        </Fragment>
    )
}

Landing.propTypes = {

}

export default Landing
