import React, { useState } from "react";
import NotesList from "./components/NotesList";
import NoteForm from "./components/NoteForm";

function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshNotes = () => setRefresh(!refresh);

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Notes App</h1>
      <NoteForm refreshNotes={refreshNotes} />
      <NotesList key={refresh} />
    </div>
  );
}

export default App;
