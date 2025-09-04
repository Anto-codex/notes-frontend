import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  // Fetch notes from backend
  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API_URL}/notes/`);
      setNotes(res.data);
    } catch (err) {
      setError("Failed to load notes.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Delete note
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      setError("Failed to delete note.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>All Notes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {notes.length === 0 && <p>No notes available.</p>}
      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => handleDelete(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default NotesList;
