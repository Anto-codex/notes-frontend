import React, { useState } from "react";
import NotesList from "./components/NotesList";
import NoteForm from "./components/NoteForm";

function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshNotes = () => setRefresh(!refresh);

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Notes App</h1>
      {/* Pass refreshNotes to NoteForm */}
      <NoteForm refreshNotes={refreshNotes} />
      
      {/* Pass key to NotesList to re-render after changes */}
      <NotesList key={refresh} />
    </div>
  );
}

export default App;
