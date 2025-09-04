// src/components/NoteForm.js
import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

function NoteForm({ refreshNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Both Title and Content are required!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API_URL}/notes/`, { title, content });
      setTitle("");
      setContent("");
      refreshNotes(); // refresh NotesList
    } catch (err) {
      console.error(err);
      setError("Failed to add note. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Add Note</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "8px", width: "300px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ padding: "8px", width: "300px", height: "80px", marginBottom: "10px" }}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Note"}
        </button>
      </form>
    </div>
  );
}

export default NoteForm;
