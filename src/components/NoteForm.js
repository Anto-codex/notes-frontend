import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function NoteForm({ refreshNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    await axios.post(`${API_URL}/notes/`, { title, content });
    setTitle("");
    setContent("");
    refreshNotes(); // Refresh list after adding
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <input placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <button type="submit">Add Note</button>
    </form>
  );
}
