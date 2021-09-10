import { useState } from "react";

export default function NotionAddPrinciple() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const handleNotionSubmit = async () => {
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
    <div>
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
      <button disabled onClick={() => handleNotionSubmit()}>
        Add Principle
      </button>
    </div>
  );
}
