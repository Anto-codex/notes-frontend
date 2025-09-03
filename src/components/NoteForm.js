import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function NoteForm({ refreshNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/notes/`, { title, content });
      setTitle("");
      setContent("");
      refreshNotes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required />
      <button type="submit">Add Note</button>
    </form>
  );
}
