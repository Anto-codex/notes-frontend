import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

function NotesList() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API_URL}/notes/`);
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/notes/${id}`);
      fetchNotes(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>All Notes</h2>
      {notes.length === 0 && <p>No notes yet.</p>}
      <ul>
        {notes.map((note) => (
          <li key={note.id} style={{ marginBottom: "10px" }}>
            <strong>{note.title}</strong>: {note.content}{" "}
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesList;
