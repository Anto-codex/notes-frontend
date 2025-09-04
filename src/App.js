import React, { useState } from "react";
import NotesList from "./components/NotesList";
import NoteForm from "./components/NoteForm";

function App() {
  const [refresh, setRefresh] = useState(false);

  // Function to refresh the notes list after adding/deleting
  const refreshNotes = () => setRefresh(!refresh);

  return (
    <div
      className="App"
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Notes App</h1>

      {/* Note Form to Add or Edit Notes */}
      <NoteForm refreshNotes={refreshNotes} />

      {/* List of Notes */}
      <NotesList key={refresh} />
    </div>
  );
}

export default App;
