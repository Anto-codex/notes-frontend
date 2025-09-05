import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

function NotesList({ key }) {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_URL}/notes/`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [key]); // refresh when key changes

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/notes/${id}`);
      fetchNotes(); // refresh after delete
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note");
    }
  };

  if (notes.length === 0) return <p>No notes yet.</p>;

  return (
    <div>
      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
          }}
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button
            onClick={() => handleDelete(note.id)}
            style={{ padding: "4px 8px", background: "red", color: "#fff" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default NotesList;
