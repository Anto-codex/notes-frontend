import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function NotesList({ refresh }) {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await axios.get(`${API_URL}/notes/`);
    setNotes(res.data);
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/notes/${id}`);
      fetchNotes(); // Refresh after deletion
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [refresh]);

  return (
    <div>
      <h2>All Notes</h2>
      {notes.map((note) => (
        <div key={note.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <p><strong>Title:</strong> {note.title}</p>
          <p><strong>Content:</strong> {note.content}</p>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
