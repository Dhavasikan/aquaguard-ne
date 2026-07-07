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

  const riskColor = (level) => {
    if (level === "High") return "#ff6b6b";
    if (level === "Medium") return "#ffd166";
    return "#51cf66";
  };

  const pageStyle = {
    padding: "30px",
    backgroundColor: "#0d2b1f",
    minHeight: "100vh",
    color: "#e6f4ea",
    fontFamily: "Arial, sans-serif",
  };

  const cardStyle = {
    backgroundColor: "#123626",
    borderRadius: "12px",
    padding: "25px",
    marginBottom: "30px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    maxWidth: "400px",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #2f6e4e",
    backgroundColor: "#0d2b1f",
    color: "#e6f4ea",
    fontSize: "14px",
  };

  const buttonStyle = {
    backgroundColor: "#2fb872",
    color: "#0d2b1f",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
  };

  const deleteButtonStyle = {
    backgroundColor: "#ff6b6b",
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  };

  const thStyle = {
    textAlign: "left",
    padding: "10px",
    borderBottom: "2px solid #2f6e4e",
    color: "#8fd4ac",
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #1c4a33",
  };

  return (
    <div style={pageStyle}>
      <h2 style={{ marginBottom: "5px" }}>💧 Water Quality Monitoring</h2>
      <p style={{ color: "#8fd4ac", marginBottom: "25px" }}>
        Track water source readings across NE India
      </p>

      <div style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>Add New Reading</h3>
        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Source Name (e.g. Barak River)"
            value={sourceName}
            onChange={(e) => setSourceName(e.target.value)}
            required
          />

          <input
            style={inputStyle}
            type="text"
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
          />

          <input
            style={inputStyle}
            type="number"
            step="0.1"
            placeholder="pH Level"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
            required
          />

          <input
            style={inputStyle}
            type="number"
            step="0.1"
            placeholder="Turbidity"
            value={turbidity}
            onChange={(e) => setTurbidity(e.target.value)}
            required
          />

          <select
            style={inputStyle}
            value={riskLevel}
            onChange={(e) => setRiskLevel(e.target.value)}
          >
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk</option>
          </select>

          <input
            style={inputStyle}
            type="date"
            value={testDate}
            onChange={(e) => setTestDate(e.target.value)}
            required
          />

          <button type="submit" style={buttonStyle}>
            Add Reading
          </button>
        </form>
      </div>

      <div style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>All Readings</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Source</th>
              <th style={thStyle}>District</th>
              <th style={thStyle}>pH</th>
              <th style={thStyle}>Turbidity</th>
              <th style={thStyle}>Risk Level</th>
              <th style={thStyle}>Test Date</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {readings.length === 0 && (
              <tr>
                <td style={tdStyle} colSpan="7">
                  No readings yet. Add one above.
                </td>
              </tr>
            )}
            {readings.map((r) => (
              <tr key={r.id}>
                <td style={tdStyle}>{r.sourceName}</td>
                <td style={tdStyle}>{r.district}</td>
                <td style={tdStyle}>{r.ph}</td>
                <td style={tdStyle}>{r.turbidity}</td>
                <td style={{ ...tdStyle, color: riskColor(r.riskLevel), fontWeight: "bold" }}>
                  {r.riskLevel}
                </td>
                <td style={tdStyle}>{r.testDate}</td>
                <td style={tdStyle}>
                  <button style={deleteButtonStyle} onClick={() => handleDelete(r.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WaterQuality;