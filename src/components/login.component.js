import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import FileUploader from './file_uploader'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isNewPasswordRequired, setIsNewPasswordRequired] = useState(false);
  const [userData, setUserData] = useState("");

  //When clicking on the submit button
  const onSubmit = event => {
    event.preventDefault();
    //create user and pool object
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool
    });
    //create user object
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });
    
    //verify user's details
    user.authenticateUser(authDetails, {
      onSuccess: data => {
        //console.log("onSuccess:", data);
        setIsAuthenticated(true);
        //get user's data
        setUserData(data)
        setIsNewPasswordRequired(false);
        setErrorMessage("");
      },
      onFailure: err => {
        //console.error("onFailure:", err);
        setIsAuthenticated(false);
        setIsNewPasswordRequired(false);
        setErrorMessage("Authentication failed. Please check your email and password.");
      },
      newPasswordRequired: data => {
        //console.log("newPasswordRequired:", data);
        setIsAuthenticated(false);
        setIsNewPasswordRequired(true);
        setErrorMessage("");
      }
    });
  };

  //When user authenticated show the file uploader component and method
  if (isAuthenticated) {
    return <FileUploader userData={userData}/>;
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email} 
            onChange={event => setEmail(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>

        {isNewPasswordRequired && (
          <p className="text-info">
            A new password is required. Please reset your password.
          </p>
        )}

        {errorMessage && (
          <p className="text-danger">
            {errorMessage}
          </p>
        )}

        <p className="forgot-password text-right">
          Forgot <a href="https://animals-project-recognition.auth.us-east-1.amazoncognito.com/forgotPassword?client_id=2lofbteduocnk03vbeb8eobl6u&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F">password? </a>
          New User? <a href="/sign-up">Sign up!</a>
        </p>
        
      </form>
    </div>
  );
};
export default Login;