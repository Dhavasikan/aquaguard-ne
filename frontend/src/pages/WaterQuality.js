import React, { useState, useEffect } from "react";

function WaterQuality() {
  const [readings, setReadings] = useState([]);
  const [sourceName, setSourceName] = useState("");
  const [district, setDistrict] = useState("");
  const [ph, setPh] = useState("");
  const [turbidity, setTurbidity] = useState("");
  const [riskLevel, setRiskLevel] = useState("Low");
  const [testDate, setTestDate] = useState("");

  const API_URL = "https://aquaguard-ne.onrender.com/api/water";

  const fetchReadings = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setReadings(data))
      .catch((err) => console.error("Error fetching readings:", err));
  };

  useEffect(() => {
    fetchReadings();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReading = {
      sourceName: sourceName,
      district: district,
      ph: parseFloat(ph),
      turbidity: parseFloat(turbidity),
      riskLevel: riskLevel,
      testDate: testDate,
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReading),
    })
      .then((res) => res.json())
      .then(() => {
        setSourceName("");
        setDistrict("");
        setPh("");
        setTurbidity("");
        setRiskLevel("Low");
        setTestDate("");
        fetchReadings();
      })
      .catch((err) => console.error("Error adding reading:", err));
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => fetchReadings())
      .catch((err) => console.error("Error deleting reading:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Water Quality Monitoring</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <h3>Add New Reading</h3>

        <input
          type="text"
          placeholder="Source Name (e.g. Barak River)"
          value={sourceName}
          onChange={(e) => setSourceName(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="text"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          step="0.1"
          placeholder="pH Level"
          value={ph}
          onChange={(e) => setPh(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          step="0.1"
          placeholder="Turbidity"
          value={turbidity}
          onChange={(e) => setTurbidity(e.target.value)}
          required
        />
        <br /><br />

        <select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)}>
          <option value="Low">Low Risk</option>
          <option value="Medium">Medium Risk</option>
          <option value="High">High Risk</option>
        </select>
        <br /><br />

        <input
          type="date"
          value={testDate}
          onChange={(e) => setTestDate(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Add Reading</button>
      </form>

      <h3>All Readings</h3>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Source</th>
            <th>District</th>
            <th>pH</th>
            <th>Turbidity</th>
            <th>Risk Level</th>
            <th>Test Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {readings.map((r) => (
            <tr key={r.id}>
              <td>{r.sourceName}</td>
              <td>{r.district}</td>
              <td>{r.ph}</td>
              <td>{r.turbidity}</td>
              <td>{r.riskLevel}</td>
              <td>{r.testDate}</td>
              <td>
                <button onClick={() => handleDelete(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WaterQuality;