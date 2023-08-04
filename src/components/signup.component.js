import React, { useState } from "react";
import UserPool from "../UserPool";
import ConfirmationComponent from "./confirmRegistration.component";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [plan, setPlan] = useState("Free Tier");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [usersData, setUsersData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Password validation function
  const isPasswordValid = (password) => {
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    return (
      numberRegex.test(password) &&
      specialCharRegex.test(password) &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      password.length >= 8
    );
  };

  //When clicking on the submit button
  const onSubmit = (event) => {
    event.preventDefault();
  
    // Check if the password meets the requirements
    if (!isPasswordValid(password)) {
      setErrorMessage(
        "Password must contain at least 1 number, 1 special character, 1 uppercase letter, 1 lowercase letter, and be at least 8 characters long."
      );
      return;
    }
  
    // Communicate with Cognito, try to create a new user
    UserPool.signUp(
      email,
      password,
      [
        { Name: "name", Value: fullName },
        { Name: "gender", Value: gender },
        { Name: "custom:Plan", Value: plan },
      ],
      null,
      (err, data) => {
        if (err) {
          // Handle different Cognito error codes
          if (err.code === "UsernameExistsException") {
            setErrorMessage("An account with this email already exists.");
          } else if (err.code === "InvalidParameterException") {
            setErrorMessage("Invalid parameters provided. Please check your input.");
          } else if (err.code === "InvalidPasswordException") {
            setErrorMessage(
              "Password must contain at least 1 number, 1 special character, 1 uppercase letter, 1 lowercase letter, and be at least 8 characters long."
            );
          } else {
            setErrorMessage("An error occurred. Please try again later.");
          }
          console.error(err);
        } else {
          console.log(data);
          setUsersData(data.user);
          setShowConfirmation(true); // Set the state to show the ConfirmationComponent
        }
      }
    );
  };

  return (
    <div>
      {/* Successful sign-up will redirect the user to the confirmation process */}
      {showConfirmation ? (
        <ConfirmationComponent user={usersData} /> // Render the ConfirmationComponent if showConfirmation is true
      ) : (
        <div>
          <form onSubmit={onSubmit}>
            <h3>Sign Up</h3>

            <div className="mb-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Full name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label>Gender</label>
              <p>
                <input type="radio" 
                  name="gender" 
                  value="male" 
                  required 
                  onChange={event => setGender(event.target.value)}/> Male&nbsp;
                <input type="radio" 
                  name="gender" 
                  value="female" 
                  onChange={event => setGender(event.target.value)}/> Female&nbsp;
                <input type="radio" 
                  name="gender" 
                  value="other" 
                  onChange={event => setGender(event.target.value)}/> Other
              </p>
            </div>

            <div className="mb-3">
              <label>Plan</label>
              <br/>
              <select onChange={event => setPlan(event.target.value)} required >
                <option value="Free Tier" defaultValue>Free Tier</option>
                <option value="Professional">Professional</option>
                <option value="Entreprise">Entreprise</option>
              </select>
            </div>
            

            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email} 
                onChange={event => setEmail(event.target.value)}
                required 
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/sign-in">sign in?</a>
            </p>
          </form>
          <br />
        
          <div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};
