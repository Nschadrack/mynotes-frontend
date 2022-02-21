import React, { useContext } from 'react'
import  BackgroundImage from "../assets/background.jpg";
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import AuthContext from '../context/AuthContext';
var Styles = {
  backgroundImage: `url(${BackgroundImage})`,
  backgroundPosition: "center",
};
const HomePage = () => {
    let { showLoginForm } = useContext(AuthContext);
  return (
    <div className="container" style={Styles}>
      <div
        className="app"
        style={{
          backgroundColor: "rgba(34, 39, 53, 0.7)",
          borderRadius: "5px",
        }}
      >
        <div className="form-section">
          <h3>Welcome to my notes</h3>
          {showLoginForm ? <LoginForm /> : <RegisterForm/>}
        </div>
      </div>
    </div>
  );
}

export default HomePage