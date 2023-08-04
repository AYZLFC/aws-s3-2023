import React, { useState } from 'react';
import Login from './login.component'


function ConfirmationComponent(props) {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [confirmationError, setConfirmationError] = useState(null);
  const {user} = props
  const [showLogin, setShowLogin] = useState(false);
  


  const handleConfirmationChange = (event) => {
    setConfirmationCode(event.target.value);
    setConfirmationError(null);
  };

  const handleConfirmationSubmit = (event) => {
    event.preventDefault();

    // Confirm the user's registration using the provided confirmation code
    user.confirmRegistration(confirmationCode, false, (err, result) => {
      if (err) {
        //console.error('Error confirming registration:', err);
        setConfirmationError('Invalid confirmation code. Please try again.');
        return;
      }
      else{
        //console.log('User registration confirmed:', result);
        setShowLogin(true); // Set the state to show the Login page
      }
      
    });
  };

  return (
    <div>
        {showLogin ? (
        <Login/>
      ) : (
            <form onSubmit={handleConfirmationSubmit}>
                <h2>Confirmation</h2>
                <div className="mb-3">
                    <label>Confirmation Code:</label>
                    <input type="text" 
                        value={confirmationCode} 
                        onChange={handleConfirmationChange} 
                        className="form-control"
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Confirm</button>
                </div>
                {confirmationError && <p className="text-danger">{confirmationError}</p>}
            </form>
        )}
    </div>
  );
};

export default ConfirmationComponent;
