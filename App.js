import React, { useState } from "react";

export default function App() {
  const [car, setCar] = useState({ make: "", model: "", year: "", mileage: "" });
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    const res = await fetch("http://localhost:3001/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ car, question })
    });
    const data = await res.json();
    setResponse(data.answer);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">SmartCar Buddy</h1>
      <input placeholder="Make" value={car.make} onChange={e => setCar({ ...car, make: e.target.value })} />
      <input placeholder="Model" value={car.model} onChange={e => setCar({ ...car, model: e.target.value })} />
      <input placeholder="Year" value={car.year} onChange={e => setCar({ ...car, year: e.target.value })} />
      <input placeholder="Mileage" value={car.mileage} onChange={e => setCar({ ...car, mileage: e.target.value })} />
      <textarea placeholder="Ask AI..." value={question} onChange={e => setQuestion(e.target.value)} />
      <button onClick={handleAsk}>Ask</button>
      {response && <div className="mt-4 p-2 border">{response}</div>}
    </div>
  );
}

