import React, { useEffect, useState } from "react";
import NoteContext from "./NoteContext";
import { data } from "react-router-dom";

export default function NoteState(props) {

  const InitialNotes = []
  const noteRoutes = import.meta.env.VITE_API_NOTES_URL;
  const [notes, setNotes] = useState(InitialNotes);


  //fetch all notes
  async function fetchAllNotes() {
    //Api call
    const response = await fetch(`${noteRoutes}/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }


  //add a  note
  async function addNote(title, description, tag) {
    //Api call
    const response = await fetch(`${noteRoutes}/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const newNote = await response.json();
    // adding note
    setNotes(notes.concat(newNote));
  }


  //delete a note
  async function deleteNote(id) {
    //Api call
    const response = await fetch(`${noteRoutes}/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // delete request
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }



  //edit a note
  async function editNote(id, title, description, tag) {
    //Api call
    const response = await fetch(`${noteRoutes}/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    
    //another way of merging the data
    const updatedNotes = notes.map(note =>
      note._id === id
        ? { ...note, title, description, tag }
        : note
    );

    setNotes(updatedNotes);
  }

  return (
    // {/* <NoteContext.Provider value={{state, update}}> */}
    <NoteContext.Provider value={{ notes, fetchAllNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}