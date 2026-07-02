import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    fullName: "",
    userCode: "",
    email: "",
    password: "",
    role: "ASHA",
    district: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/auth/register", form);
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      alert("Registration failed. Please try again.");
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
          <Link to="/add-report" className="nav-item">➕ Add Report</Link>
          <Link to="/register" className="nav-item active">👤 Register User</Link>
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
            <h1 className="page-title">Register New User</h1>
            <p className="page-subtitle">Add a new health worker or officer to the system</p>
          </div>
          <Link to="/dashboard" className="btn-outline">← Back to Dashboard</Link>
        </div>

        {success && (
          <div className="success-banner">
            ✅ User registered successfully! Redirecting to dashboard...
          </div>
        )}

        <div className="form-container">
          <div className="form-info-box">
            <h3>👤 User Roles</h3>
            <ul>
              <li><strong style={{color:"#5bc8a0"}}>ASHA Worker</strong> — Field health reporting and community surveillance</li>
              <li><strong style={{color:"#5bc8a0"}}>DHO</strong> — District Health Officer, monitors district data</li>
              <li><strong style={{color:"#5bc8a0"}}>Lab Technician</strong> — Water quality and disease test results</li>
              <li><strong style={{color:"#5bc8a0"}}>State Admin</strong> — Full system access and management</li>
            </ul>

            <div style={{marginTop:"1.5rem", padding:"1rem", background:"rgba(91,200,160,0.08)", borderRadius:"8px", border:"1px solid rgba(91,200,160,0.2)"}}>
              <div style={{fontSize:"0.75rem", fontWeight:"700", color:"#5bc8a0", marginBottom:"0.5rem"}}>USER CODE FORMAT</div>
              <div style={{fontSize:"0.78rem", color:"#8abca0", lineHeight:"1.7"}}>
                ASHA Worker: <code style={{color:"#5bc8a0"}}>ASHA-AS-001</code><br/>
                Health Officer: <code style={{color:"#5bc8a0"}}>DHO-MG-001</code><br/>
                Lab Tech: <code style={{color:"#5bc8a0"}}>LAB-RB-001</code><br/>
                Admin: <code style={{color:"#5bc8a0"}}>ADM-ST-001</code>
              </div>
            </div>
          </div>

          <form className="report-form" onSubmit={handleRegister}>
            <div className="form-section-title full-width">👤 Personal Information</div>

            <div>
              <label>Full Name *</label>
              <input name="fullName" onChange={handleChange} placeholder="Enter full name" required />
            </div>

            <div>
              <label>User Code *</label>
              <input name="userCode" onChange={handleChange} placeholder="e.g. ASHA-AS-001" required />
            </div>

            <div>
              <label>Email Address *</label>
              <input type="email" name="email" onChange={handleChange} placeholder="user@example.com" required />
            </div>

            <div>
              <label>Phone Number *</label>
              <input name="phone" onChange={handleChange} placeholder="10-digit mobile number" required />
            </div>

            <div className="form-section-title full-width">🔐 Account Details</div>

            <div>
              <label>Password *</label>
              <input type="password" name="password" onChange={handleChange} placeholder="Minimum 6 characters" required />
            </div>

            <div>
              <label>Role *</label>
              <select name="role" onChange={handleChange}>
                <option value="ASHA">ASHA Worker</option>
                <option value="DHO">District Health Officer</option>
                <option value="LAB">Lab Technician</option>
                <option value="ADMIN">State Admin</option>
              </select>
            </div>

            <div className="form-section-title full-width">📍 Location</div>

            <div className="full-width">
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

            <button type="submit" className="full-width" disabled={loading}>
              {loading ? "Registering..." : "✅ Register User"}
            </button>

            <div className="full-width" style={{textAlign:"center", fontSize:"0.85rem", color:"#8abca0"}}>
              Already have an account? <Link to="/" style={{color:"#5bc8a0", fontWeight:"700"}}>Sign In here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;