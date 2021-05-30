import "./App.css";

import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    console.log(JSON.stringify({ title: title, notes: notes }));
    const response = await fetch("/api/addPrinciple", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, notes: notes }),
    });
    console.log(response);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h4>Sick demo principles</h4>
        <label>Principle title</label>
        <input
          type="text"
          name="principleTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Principle notes</label>
        <input
          type="text"
          name="principleNotes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button onClick={handleSubmit}>Add Principle</button>
      </header>
    </div>
  );
}

export default App;
