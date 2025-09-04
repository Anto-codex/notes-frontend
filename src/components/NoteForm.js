import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

function NoteForm({ refreshNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Both fields are required!");

    try {
      await axios.post(`${API_URL}/notes/`, { title, content });
      setTitle("");
      setContent("");
      refreshNotes(); // Refresh list after adding
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: "8px", width: "300px", marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ padding: "8px", width: "300px", marginRight: "10px" }}
      />
      <button type="submit" style={{ padding: "8px 16px" }}>Add Note</button>
    </form>
  );
}

export default NoteForm;
