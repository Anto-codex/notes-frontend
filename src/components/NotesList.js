import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";  // <-- imported here

export default function NotesList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/notes/`)  // <-- use API_URL here
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Notes</h2>
      {notes.map((note, idx) => (
        <div key={idx} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

