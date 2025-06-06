import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);

  // Add any additional functions to manipulate notes here
  // Fetch all notes
  const getNotes = async () => {
    //Api call to add a note
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgzOTI1MmRlYzMwMjg5YjZlNjhiZDM0In0sImlhdCI6MTc0ODU3NTg4OH0.ON_hN7Q2ZwqozlLI3p4rySP4o2HD_0XT7khB7ENpzgk",
      },
    });
    const json = await response.json();
    console.log(json);

    // Logic to fetch all notes
    setNotes(json);
    // console.log("Fetching all notes");
  };

  // Add a new note
  const addNote = async (title, description, tag) => {
    //Api call to add a note
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgzOTI1MmRlYzMwMjg5YjZlNjhiZDM0In0sImlhdCI6MTc0ODU3NTg4OH0.ON_hN7Q2ZwqozlLI3p4rySP4o2HD_0XT7khB7ENpzgk",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // Logic to add a note
    console.log("Adding a new note");
    const note = {
      _id: "683fb3d25c1d6196fce76c651",
      user: "6839252dec30289b6e68bd34",
      title: title,
      description: description,
      tag: tag,
      date: "2025-06-04T02:47:46.517Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  // Delete a note
  const deleteNote = async (id) => {
    //Api call to delete a note
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgzOTI1MmRlYzMwMjg5YjZlNjhiZDM0In0sImlhdCI6MTc0ODU3NTg4OH0.ON_hN7Q2ZwqozlLI3p4rySP4o2HD_0XT7khB7ENpzgk",
      },
    });
    const json = response.json();
    console.log(json);

    // Logic to delete a note
    console.log("Deleting a note" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    //Api call to edit a note
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgzOTI1MmRlYzMwMjg5YjZlNjhiZDM0In0sImlhdCI6MTc0ODU3NTg4OH0.ON_hN7Q2ZwqozlLI3p4rySP4o2HD_0XT7khB7ENpzgk",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    // Logic to edit a note
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
