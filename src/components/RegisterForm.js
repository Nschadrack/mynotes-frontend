import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext';

const RegisterForm = () => {
    let {
      showLoginForm,
      passwordsEqual, handleSetShowLoginForm,
      handleRegister,
    } = useContext(AuthContext);
  return (
    <div className="user-form">
      {!passwordsEqual && <p style={{color: "rgba(255, 0, 0, 0.8)", backgroundColor: 'white', fontSize: '14px'}}>password fields must match and must be at least 6 characters</p>}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name..."
            className="form-group-control" minLength="2"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name..."
            className="form-group-control" minLength="2"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
            className="form-group-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Enter your username..."
            className="form-group-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            className="form-group-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password2"
            placeholder="Re-type your password..."
            className="form-group-control"
            required
          />
        </div>
        <input type="submit" value="create account" />
      </form>
      <div className="last-section">
        <p>
          Already have an account?{" "}
          <span onClick={() => handleSetShowLoginForm(!showLoginForm)}>
            login
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm