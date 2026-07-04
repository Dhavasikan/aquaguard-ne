import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ReportList() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="11" style={{textAlign:"center", padding:"2rem", color:"#a0c8b0"}}>
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
                    <td>{r.diseaseSuspected}</td>
                    <td className="symptoms-cell">{r.symptoms}</td>
                    <td>{r.reportDate}</td>
                    <td><span className={getStatusClass(r.status)}>{r.status}</span></td>
                    <td>
                      <button className="btn-danger" onClick={() => handleDelete(r.id)}>Delete</button>
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