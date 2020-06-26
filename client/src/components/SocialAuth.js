import React from "react";
import { GoogleLogin } from "react-google-login";
import { googleLogin } from "../action/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const SocialAuth = ({ googleLogin }) => {
  // logout = () => {
  //     this.setState({isAuthenticated: false, token: '', user: null})
  // };s

  const googleResponse = async (response) => {
    googleLogin(response.accessToken, null, response.profileObj);
  };
  const onFailure = (err) => {
    console.log(err);
  };
  return (
    <div>
      <GoogleLogin
        clientId="708720289870-ts23q0egm5kvtimchnlf7h83eho1399u.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={googleResponse}
        onFailure={onFailure}
      >
        <span> Google</span>
      </GoogleLogin>
    </div>
  );
};
SocialAuth.propTypes = {
  googleLogin: PropTypes.func.isRequired,
};
export default connect(null, { googleLogin })(SocialAuth);
