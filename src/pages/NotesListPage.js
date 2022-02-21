import React, { useContext, useEffect } from "react";
import AddButton from "../components/AddButton";
import ListItem from "../components/ListItem";
import Header from "../components/Header";
import AuthContext from "../context/AuthContext";


// const URL = "http://localhost:8000/";
const URL = "https://mynotes-apis.herokuapp.com/";

const NotesListPage = () => {
  let { notes,user, authTokens, logoutUser, setNotes } = useContext(AuthContext);
  useEffect(async () => {
    let response = await fetch(`${URL}notes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens?.access),
      },
    });
    if (response.status === 200) {
      let data = await response.json();
      setNotes(data);
    } else {
      logoutUser();
    }
  }, []);

  return (
    <div className="container dark">
        <div className="app">
          <Header />
          <div className="notes">
            <div className="notes-header">
              <h2 className="notes-title">&#9782; Notes</h2>
              <p className="notes-count">{notes.length}</p>
            </div>
            <div className="notes-list">
              {notes.map((note, index) => (
                <ListItem key={index} note={note} />
              ))}
            </div>
            {user && <p className="user-profile">{user.first_name} {user.last_name}</p>}
            <AddButton/>
          </div>
        </div>
      </div>
  );
};

export default NotesListPage;
