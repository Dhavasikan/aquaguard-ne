import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function ReportForm() {
  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "Male",
    village: "",
    district: "",
    symptoms: "",
    diseaseSuspected: "Cholera",
    reportDate: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/reports", form);
      alert("Case report submitted successfully!");
      navigate("/reports");
    } catch (err) {
      alert("Failed to submit report.");
    }
    setLoading(false);
  };

  return (
    <div className="app-layout">
      <div className="sidebar">
        <div className="sidebar-logo">💧 AquaGuard NE</div>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item">📊 Dashboard</Link>
          <Link to="/reports" className="nav-item">📋 Case Reports</Link>
          <Link to="/add-report" className="nav-item active">➕ Add Report</Link>
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
            <h1 className="page-title">New Case Report</h1>
            <p className="page-subtitle">Submit a new water-borne disease case for surveillance</p>
          </div>
          <Link to="/reports" className="btn-outline">← Back to Reports</Link>
        </div>

        <div className="form-container">
          <div className="form-info-box">
            <h3>📋 Reporting Guidelines</h3>
            <ul>
              <li>Fill all required fields accurately</li>
              <li>Select the correct suspected disease</li>
              <li>List all symptoms observed</li>
              <li>Enter the exact date of report</li>
              <li>Reports are reviewed by District Health Officers</li>
            </ul>
          </div>

          <form className="report-form" onSubmit={handleSubmit}>
            <div className="form-section-title full-width">👤 Patient Information</div>

            <div>
              <label>Patient Full Name *</label>
              <input name="patientName" onChange={handleChange} placeholder="Enter full name" required />
            </div>

            <div>
              <label>Age *</label>
              <input type="number" name="age" onChange={handleChange} placeholder="Age in years" required />
            </div>

            <div>
              <label>Gender *</label>
              <select name="gender" onChange={handleChange}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label>Report Date *</label>
              <input type="date" name="reportDate" onChange={handleChange} required />
            </div>

            <div className="form-section-title full-width">📍 Location Details</div>

            <div>
              <label>Village / Area *</label>
              <input name="village" onChange={handleChange} placeholder="Village or locality name" required />
            </div>

            <div>
              <label>District *</label>
              <select name="district" onChange={handleChange}>
                <option>Cachar</option>
                <option>Ri Bhoi</option>
                <option>Kamrup</option>
                <option>Bongaigaon</option>
                <option>Dima Hasao</option>
                <option>East Khasi Hills</option>
                <option>Nalbari</option>
                <option>Churachandpur</option>
                <option>Tirap</option>
                <option>Lawngtlai</option>
                <option>North Garo Hills</option>
                <option>Dimapur</option>
              </select>
            </div>

            <div className="form-section-title full-width">🏥 Medical Details</div>

            <div>
              <label>Suspected Disease *</label>
              <select name="diseaseSuspected" onChange={handleChange}>
                <option>Cholera</option>
                <option>Typhoid</option>
                <option>Diarrhea</option>
                <option>Hepatitis A</option>
                <option>Leptospirosis</option>
                <option>Dysentery</option>
                <option>Rotavirus</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label>Symptoms Observed *</label>
              <input name="symptoms" onChange={handleChange} placeholder="e.g. fever, diarrhea, vomiting" required />
            </div>

            <button type="submit" className="full-width" disabled={loading}>
              {loading ? "Submitting..." : "✅ Submit Case Report"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReportForm;