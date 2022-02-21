import React, {useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import Header from "../components/Header";
import AuthContext from "../context/AuthContext";

// const URL = "http://localhost:8000/";
const URL = "https://mynotes-apis.herokuapp.com/";
const NotePage = () => {
  const { noteId } = useParams();
  let [note, setNote] = useState(null);
  let navigate = useNavigate();
  let {setNotes, authTokens} = useContext(AuthContext);

  useEffect(async() => {
    getNote();
  }, [noteId]);

  let getNote = async () => {
    if(noteId === "new") return;
    let response = await fetch(`${URL}notes/${noteId}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + String(authTokens?.access)
      }
    });
    let data = await response.json();
    setNote(data);
  };

  let getNotes = async() =>{
    let response = await fetch(`${URL}notes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + String(authTokens?.access)
      }
    });

    if(response.status === 200){
      let data = await response.json();
      setNotes(data);
    }
  }

  let createNote = async () => {
    if(note === null || note?.body.trim().length < 1) return;
    await fetch(`${URL}notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + String(authTokens?.access)
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
    getNotes();
  };

  let updateNote = async () => {
    await fetch(`${URL}notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + String(authTokens?.access),
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
    getNotes();
  };

  let deleteNote = async () =>{
    await fetch(`${URL}notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + String(authTokens?.access),
      },
      body: JSON.stringify(note),
    });
    getNotes();
    navigate("/notes");
  }

  let handleSubmit = () => {
    if(noteId !== "new" && !note.body){
      deleteNote();
    }else if(noteId !== "new"){
        updateNote();
    }else if(noteId === "new"){
      createNote();
    }
    navigate("/notes");
  };

  return (
    <div className="container dark">
        <div className="app">
          <Header />
          <div className="note">
            <div className="note-header">
              <h3>
                <Link to="/notes">
                  <ArrowLeft onClick={handleSubmit} />
                </Link>
              </h3>
              {noteId !== "new" ? (
                <button onClick={deleteNote}>Delete</button>
              ) : (
                <button onClick={handleSubmit}>Done</button>
              )}
            </div>
            <textarea
              value={note?.body}
              onChange={(e) => {
                setNote({ ...note, body: e.target.value });
              }}
            ></textarea>
          </div>
        </div>
    </div>
  );
};

export default NotePage;
