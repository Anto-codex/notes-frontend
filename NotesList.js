import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = () => {
    axios.get(`${API_URL}/notes/`)
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (note) => {
    setEditingNote(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/notes/${editingNote}`, { title, content });
      setEditingNote(null);
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const copyShareLink = (id) => {
    const link = `${API_URL}/notes/share/${id}`;
    navigator.clipboard.writeText(link);
    alert("Share link copied to clipboard!");
  };

  return (
    <div>
      <h2>All Notes</h2>
      {notes.map((note) => (
        <div key={note.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          {editingNote === note.id ? (
            <div>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
              <textarea value={content} onChange={(e) => setContent(e.target.value)} />
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingNote(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => handleDelete(note.id)} style={{ color: "red" }}>Delete</button>
              <button onClick={() => startEdit(note)}>Edit</button>
              <button onClick={() => copyShareLink(note.id)}>Share</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
