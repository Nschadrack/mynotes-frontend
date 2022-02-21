import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
  let {logoutUser} = useContext(AuthContext);
  return (
    <div className="app-header">
      <h1>Notes List</h1>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};


export default Header
