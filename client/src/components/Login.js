import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../action/auth";
import PropTypes from "prop-types";
import  SocialAuth  from "./SocialAuth";

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <Fragment>
            <section className="sign-in">
                <div className="container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure><img src={require("../images/signin-image.jpg")} alt="sing up image" /></figure>
                            <a href="#" className="signup-image-link">Create an account</a>
                        </div>

                        <div className="signin-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" onSubmit={(e) => onSubmit(e)} id="login-form">
                                <div className="form-group">
                                    <label for="email"><i class="fas fa-envelope"></i></label>
                                    <input type="email" name="email" id="email" value={email} placeholder="Your Email" onChange={(e) => onChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label for="pass"><i class="fas fa-lock"></i></label>
                                    <input type="password" name="password" id="pass" value={password} placeholder="Password" onChange={(e) => onChange(e)} />
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                    <label for="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" value="Log in" />
                                </div>
                            </form>
                            <div className="social-login">
                                <span className="social-label">Or login with</span>
                                <ul className="socials">
                                    <li><SocialAuth /></li>

                                    <li><a href="#"><i className="fab fa-google"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);