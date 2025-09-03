import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function NoteForm({ refreshNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      await axios.post(`${API_URL}/notes/`, { title, content });
      setTitle("");
      setContent("");
      refreshNotes(); // refresh list after adding
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ display: "block", marginBottom: "10px", padding: "5px", width: "100%" }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        style={{ display: "block", marginBottom: "10px", padding: "5px", width: "100%" }}
      />
      <button type="submit" style={{ padding: "5px 10px" }}>Add Note</button>
    </form>
  );
}
