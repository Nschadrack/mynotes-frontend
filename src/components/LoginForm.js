import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';

const LoginForm = () => {
    let {
      showLoginForm,
      correctCredentials, handleSetShowLoginForm,
      handleLogin,
    } = useContext(AuthContext);
  return (
    <div className="user-form">
      {!correctCredentials && (
        <p
          style={{
            color: "rgba(255, 0, 0, 0.8)",
            backgroundColor: "white",
            fontSize: "14px",
          }}
        >
          check your username and password and retry to login
        </p>
      )}
      <form
        style={{ margin: "35% 0px", display: "block" }}
        onSubmit={handleLogin}
      >
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
        <input type="submit" value="Login" />
      </form>
      <div className="last-section">
        <p>
          Don't have an account?{" "}
          <span onClick={() => handleSetShowLoginForm(!showLoginForm)}>
            create an account
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginForm