import React, { Fragment, useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../action/alert";
// import { register } from "../reducer/alert";
import PropTypes from "prop-types";


const Register = ({ setAlert }) => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        password2: "",
      });
    
      const { name, username, email, password, password2 } = formData;
    
      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
          setAlert("Password dont match", "danger");
        } 
        // else {
        //   register({ name, username, email, password });
        // }
      };
    
    //   if (isAuthenticated) {
    //     return <Redirect to="/dashboard" />;
    //   }

    return (
    <Fragment>
        <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <form method="POST" className="register-form" id="register-form" onSubmit={(e) => onSubmit(e)}>
                            <div className="form-group">
                                <label for="name"><i class="fas fa-user"></i></label>
                                <input type="text" name="name" id="name" value={name} placeholder="Your Name" onChange={(e) => onChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label for="re-pass"><i class="fas fa-user"></i></label>
                                <input type="text" name="username" id="re_pass" value={username} placeholder="Username" onChange={(e) => onChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label for="email"><i class="fas fa-envelope"></i></label>
                                <input type="email" name="email" id="email" value={email} placeholder="Your Email" onChange={(e) => onChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label for="pass"><i class="fas fa-lock"></i></label>
                                <input type="password" name="password" id="pass" value={password} placeholder="Password" onChange={(e) => onChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label for="re-pass"><i class="fas fa-lock"></i></label>
                                <input type="password" name="password2" id="re_pass"  value={password2} placeholder="Repeat your password" onChange={(e) => onChange(e)}/>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure><img src={require("../images/signup-image.jpg")} alt="sing up imagee" /></figure>
                            <Link to="/login">Login</Link>
                            {/* <a href="#" className="signup-image-link">I am already member</a> */}
                    </div>
                    </div>
                </div>
        </section>

   </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    // register: PropTypes.func.isRequired,
    // isAuthenticated: PropTypes.bool,
  };
  
//   const mapStateToProps = (state) => ({
//     isAuthenticated: state.auth.isAuthenticated,
//   });

export default connect(null, { setAlert })(Register);
