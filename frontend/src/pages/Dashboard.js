import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [reports, setReports] = useState([]);
  const [waterReadings, setWaterReadings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://aquaguard-ne.onrender.com/api/reports").then((res) => {
      setReports(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("https://aquaguard-ne.onrender.com/api/water").then((res) => {
      setWaterReadings(res.data);
    });
  }, []);
  const totalCases = reports.length;
  const pendingCases = reports.filter((r) => r.status === "PENDING").length;
  const resolvedCases = reports.filter((r) => r.status === "RESOLVED").length;
  const verifiedCases = reports.filter((r) => r.status === "VERIFIED").length;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const recentReports = reports.slice(-3).reverse();
  const detectOutbreaks = () => {
    const alerts = [];
    const grouped = {};
    reports.forEach((r) => {
      const key = r.district + "|" + r.diseaseSuspected;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(r);
    });
    Object.keys(grouped).forEach((key) => {
      const cases = grouped[key];
      if (cases.length >= 3) {
        const [district, disease] = key.split("|");
        alerts.push(
          `${disease} cluster detected in ${district} district. ${cases.length} cases reported.`
        );
      }
    });
    return alerts;
  };
  const outbreakAlerts = detectOutbreaks();

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
          <Link to="/dashboard" className="nav-item active">📊 Dashboard</Link>
          <Link to="/reports" className="nav-item">📋 Case Reports</Link>
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
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="main-content">
        <div className="page-header">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Smart Community Health Monitoring — Northeast India</p>
          </div>
          <div className="header-badge">
            <span className="live-dot"></span> Live Monitoring
          </div>
        </div>

        {outbreakAlerts.length > 0 && (
          <div className="alert-banner">
            ⚠ <strong>Active Alert{outbreakAlerts.length > 1 ? "s" : ""}:</strong>{" "}
            {outbreakAlerts.join(" ")}
          </div>
        )}
        <div className="stat-cards">
          <div className="stat-card">
            <div className="stat-icon">📁</div>
            <div className="stat-info">
              <div className="stat-num">{totalCases}</div>
              <div className="stat-label">Total Reports</div>
            </div>
            <div className="stat-trend">↑ 12%</div>
          </div>
          <div className="stat-card pending">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <div className="stat-num">{pendingCases}</div>
              <div className="stat-label">Pending Review</div>
            </div>
            <div className="stat-trend urgent">Urgent</div>
          </div>
          <div className="stat-card verified">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-num">{verifiedCases}</div>
              <div className="stat-label">Verified Cases</div>
            </div>
            <div className="stat-trend">Active</div>
          </div>
          <div className="stat-card resolved">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <div className="stat-num">{resolvedCases}</div>
              <div className="stat-label">Resolved</div>
            </div>
            <div className="stat-trend good">↑ Good</div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Case Reports</h3>
              <Link to="/reports" className="card-link">View All →</Link>
            </div>
            <table className="mini-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Disease</th>
                  <th>District</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((r) => (
                  <tr key={r.id}>
                    <td>{r.patientName}</td>
                    <td>{r.diseaseSuspected}</td>
                    <td>{r.district}</td>
                    <td><span className={getStatusClass(r.status)}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Disease Breakdown</h3>
            </div>
            <div className="disease-list">
              {["Cholera", "Typhoid", "Hepatitis A", "Diarrhea", "Leptospirosis"].map((d) => {
                const count = reports.filter((r) => r.diseaseSuspected === d).length;
                const pct = totalCases ? Math.round((count / totalCases) * 100) : 0;
                return (
                  <div className="disease-item" key={d}>
                    <div className="disease-name">{d}</div>
                    <div className="disease-bar-wrap">
                      <div className="disease-bar" style={{ width: pct + "%" }}></div>
                    </div>
                    <div className="disease-count">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header"><h3>Water Source Alerts</h3></div>
          <div className="water-alerts">
          {waterReadings.length === 0 && (
            <div className="water-item low">No water readings yet.</div>
          )}
          {waterReadings
        .filter((w) => w.riskLevel && w.riskLevel.toLowerCase() !== "low")
        .sort((a, b) => {
          const order = { high: 0, medium: 1, low: 2 };
          return order[a.riskLevel.toLowerCase()] - order[b.riskLevel.toLowerCase()];
        })
          .map((w) => {
            const level = w.riskLevel ? w.riskLevel.toLowerCase() : "low";
            const icon = level === "high" ? "🔴" : level === "medium" ? "🟡" : "🟢";
            return (
              <div className={`water-item ${level}`} key={w.id}>
                {icon} {w.sourceName} — pH {w.ph} · {w.riskLevel} Risk
              </div>
            );
          })}
        </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header"><h3>Quick Actions</h3></div>
            <div className="quick-actions">
              <Link to="/add-report" className="quick-btn primary">➕ New Case Report</Link>
              <Link to="/reports" className="quick-btn secondary">📋 View All Reports</Link>
              <Link to="/water-quality" className="quick-btn secondary">💧 Water Quality</Link>
              <Link to="/chatbot" className="quick-btn secondary">💬 Ask Assistant</Link>
              <Link to="/register" className="quick-btn secondary">👤 Register ASHA Worker</Link>
              <a href="https://aquaguard-ne.onrender.com/api/reports" target="_blank" rel="noreferrer" className="quick-btn secondary">🔗 View API Data</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;