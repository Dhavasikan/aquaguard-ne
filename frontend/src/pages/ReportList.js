import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import diseaseInfo from "../diseaseInfo";
 
function ReportList() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
 
  const getRiskAssessment = (report) => {
    const disease = (report.disease || "").toLowerCase();
    const symptoms = (report.symptoms || "").toLowerCase();
 
    let level = "Low";
    let suggestion = "Monitor patient and provide general hygiene advice.";
    let urgent = false;
 
    const severeDiseases = ["cholera", "leptospirosis"];
    const moderateDiseases = ["typhoid", "hepatitis a"];
 
    const severeSymptomWords = ["dehydration", "vomiting", "unconscious", "jaundice", "blood"];
    const hasSevereSymptom = severeSymptomWords.some((w) => symptoms.includes(w));
 
    if (severeDiseases.some((d) => disease.includes(d)) || hasSevereSymptom) {
      level = "High";
      suggestion = "Escalate immediately: start ORS/IV fluids and refer to nearest PHC.";
      urgent = true;
    } else if (moderateDiseases.some((d) => disease.includes(d))) {
      level = "Medium";
      suggestion = "Start antibiotics as prescribed, monitor fever closely, recheck in 2-3 days.";
    } else if (disease.includes("diarrhea")) {
      level = "Medium";
      suggestion = "Give ORS, continue feeding, monitor for dehydration signs.";
    }
 
    return { level, suggestion, urgent };
  };
 
  const loadReports = () => {
    axios.get("https://aquaguard-ne.onrender.com/api/reports").then((res) => {
      setReports(res.data);
    });
  };
 
  useEffect(() => {
    loadReports();
  }, []);
 
  const handleDelete = async (id) => {
    if (window.confirm("Delete this report?")) {
      await axios.delete(`https://aquaguard-ne.onrender.com/api/reports/${id}`);
      loadReports();
    }
  };
 
  const handleStatusChange = async (id, newStatus) => {
    const report = reports.find((r) => r.id === id);
    await axios.put(`https://aquaguard-ne.onrender.com/api/reports/${id}`, {
      ...report,
      status: newStatus,
    });
    loadReports();
  };
 
  const handleActionUpdate = async (id, notes) => {
    const report = reports.find((r) => r.id === id);
    await axios.put(`https://aquaguard-ne.onrender.com/api/reports/${id}`, {
      ...report,
      actionsTaken: notes,
    });
    loadReports();
  };
 
  const filtered = reports.filter(
    (r) =>
      r.patientName.toLowerCase().includes(search.toLowerCase()) ||
      r.district.toLowerCase().includes(search.toLowerCase()) ||
      r.diseaseSuspected.toLowerCase().includes(search.toLowerCase())
  );
 
  const getStatusClass = (status) => {
    if (status === "PENDING") return "status-badge pending";
    if (status === "VERIFIED") return "status-badge verified";
    if (status === "RESOLVED") return "status-badge resolved";
    return "status-badge";
  };
 
  return (
    <div className="app-layout">
      <div className="sidebar">
        <div className="sidebar-logo">💧 AquaGuard NE</div>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item">📊 Dashboard</Link>
          <Link to="/reports" className="nav-item active">📋 Case Reports</Link>
          <Link to="/add-report" className="nav-item">➕ Add Report</Link>
          <Link to="/register" className="nav-item">👤 Register User</Link>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="user-avatar">{user ? user.fullName[0] : "A"}</div>
            <div>
              <div className="user-name">{user ? user.fullName : "Admin"}</div>
              <div className="user-role">{user ? user.role : "ADMIN"}</div>
            </div>
          </div>
        </div>
      </div>
 
      <div className="main-content">
        <div className="page-header">
          <div>
            <h1 className="page-title">Case Reports</h1>
            <p className="page-subtitle">All reported water-borne disease cases across NE India</p>
          </div>
          <Link to="/add-report" className="btn">➕ Add New Report</Link>
        </div>
 
        <div className="list-stats">
          <div className="ls-item">Total: <strong>{reports.length}</strong></div>
          <div className="ls-item pending-text">Pending: <strong>{reports.filter(r => r.status === "PENDING").length}</strong></div>
          <div className="ls-item verified-text">Verified: <strong>{reports.filter(r => r.status === "VERIFIED").length}</strong></div>
          <div className="ls-item resolved-text">Resolved: <strong>{reports.filter(r => r.status === "RESOLVED").length}</strong></div>
        </div>
 
        <input
          className="search-box"
          placeholder="🔍 Search by patient name, district, or disease..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
 
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Village</th>
                <th>District</th>
                <th>Disease</th>
                <th>Symptoms</th>
                <th>Date</th>
                <th>Status</th>
                <th>Risk Level</th>
                <th>Suggested Action</th>
                <th>Actions Taken</th>
                <th>AI Summary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="15" style={{ textAlign: "center", padding: "2rem", color: "#a0c8b0" }}>
                    No reports found
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td><strong>{r.patientName}</strong></td>
                    <td>{r.age}</td>
                    <td>{r.gender}</td>
                    <td>{r.village}</td>
                    <td>{r.district}</td>
                    <td>
                      <span>{r.diseaseSuspected}</span>
                      {diseaseInfo[r.diseaseSuspected] && (
                        <span
                          className="info-tip"
                          title={diseaseInfo[r.diseaseSuspected].treatment}
                        >
                          {" "}ⓘ
                        </span>
                      )}
                    </td>
                    <td className="symptoms-cell">{r.symptoms}</td>
                    <td>{r.reportDate}</td>
                    <td><span className={getStatusClass(r.status)}>{r.status}</span></td>
                    <td>
                      {(() => {
                        const risk = getRiskAssessment(r);
                        const color = risk.level === "High" ? "#ff6b6b" : risk.level === "Medium" ? "#ffd166" : "#51cf66";
                        return (
                          <span style={{ color: color, fontWeight: "bold" }}>
                            {risk.urgent ? "🔴 " : risk.level === "Medium" ? "🟡 " : "🟢 "}{risk.level}
                          </span>
                        );
                      })()}
                    </td>
                    <td style={{ fontSize: "13px", maxWidth: "220px" }}>
                      {getRiskAssessment(r).suggestion}
                    </td>
                    <td>
                      <input
                        className="action-input"
                        type="text"
                        defaultValue={r.actionsTaken}
                        placeholder="e.g. Medicine given, water tested"
                        onBlur={(e) => handleActionUpdate(r.id, e.target.value)}
                      />
                    </td>
                  <td style={{ maxWidth: "220px" }}>
  {r.aiSummary ? (
    <>
      <span style={{
        display: "inline-block",
        fontFamily: "monospace",
        fontSize: "10px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#7cc4f0",
        background: "#12324a",
        padding: "2px 7px",
        borderRadius: "4px",
        marginBottom: "6px",
      }}>
        ✦ AI reading
      </span>
     <div
  title={r.aiSummary}
  style={{
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#e6f4ea",
    maxHeight: "40px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  }}
>
  {r.aiSummary}
</div>
    </>
  ) : (
    <span style={{ fontSize: "13px", fontStyle: "italic", color: "#5c7a6e" }}>
      Not generated
    </span>
  )}
</td>
                    <td style={{ minWidth: "160px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <select
                          value={r.status}
                          onChange={(e) => handleStatusChange(r.id, e.target.value)}
                          style={{
                            padding: "8px",
                            borderRadius: "6px",
                            border: "1px solid #2f6e4e",
                            backgroundColor: "#0d2b1f",
                            color: "#e6f4ea",
                            fontSize: "13px",
                          }}
                        >
                          <option value="PENDING">⏳ Pending</option>
                          <option value="VERIFIED">✅ Verified</option>
                          <option value="RESOLVED">☑️ Resolved</option>
                        </select>
                        <button
                          className="btn-danger"
                          onClick={() => {
                            if (window.confirm("Delete this report? This cannot be undone.")) {
                              handleDelete(r.id);
                            }
                          }}
                          style={{
                            padding: "6px 10px",
                            borderRadius: "6px",
                            fontSize: "13px",
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
 
export default ReportList;
 