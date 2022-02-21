import React from 'react';
import {Link} from "react-router-dom";
import {ReactComponent as AddIcon} from '../assets/add.svg';
const AddButton = () => {
  return (
    <Link to="/note/new">
      <div className="floating-button">
        <AddIcon />
      </div>
    </Link>
  );
};

export default AddButton;
