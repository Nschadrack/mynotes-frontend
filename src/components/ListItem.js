import React from "react";
import { Link } from "react-router-dom";

const getTitle = (note) => {
  const title = note.body.split("\n")[0];
  if(title.length > 60){
    return title.slice(0, 60) + "...";
  }
  return title;
}

const getContent = (note) =>{
  let title = getTitle(note);
  let content = note.body.replaceAll("\n", " ");
  content = content.replaceAll(title, "")
  if(content > 40){
    return content.slice(0, 40);
  }else{
    return content;
  }
}
let getDate = (noteDate) =>{
  return `${new Date(noteDate).toDateString()}, ${new Date(noteDate).toLocaleTimeString()}`;
}
const ListItem = ({ note }) => {
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p>
          <span>Created: {getDate(note.created)}</span>
          <span>Last updated: {getDate(note.updated)}</span>
          {/* <span>{getContent(note)}</span> */}
        </p>
      </div>
    </Link>
  );
};

export default ListItem;
