import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://aquaguard-ne.onrender.com/api/auth/login", {
        email,
        password,
      });
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("Connection failed. Make sure backend is running.");
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-logo">💧 AquaGuard NE</div>
          <h1 className="auth-tagline">Smart Health Surveillance for Northeast India</h1>
          <p className="auth-desc">AI-powered water-borne disease monitoring and early warning system for rural communities across 8 NE states.</p>
          <div className="auth-stats-row">
            <div className="auth-stat"><span className="auth-stat-num">8</span><span className="auth-stat-label">NE States</span></div>
            <div className="auth-stat"><span className="auth-stat-num">72h</span><span className="auth-stat-label">Early Warning</span></div>
            <div className="auth-stat"><span className="auth-stat-num">94%</span><span className="auth-stat-label">AI Accuracy</span></div>
          </div>
          <div className="auth-roles-title">Authorized Roles</div>
          <div className="auth-roles">
            <span className="role-badge">🏥 ASHA Worker</span>
            <span className="role-badge">👨‍⚕️ Health Officer</span>
            <span className="role-badge">🔬 Lab Technician</span>
            <span className="role-badge">🛡 State Admin</span>
          </div>
        </div>
      </div>
      <div className="auth-right">
        <form className="auth-card" onSubmit={handleLogin}>
          <div className="auth-card-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your AquaGuard account</p>
          </div>
          {error && <div className="error-text">⚠ {error}</div>}
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In →"}
          </button>
          <div className="auth-demo">
            <p>Demo credentials:</p>
            <code>admin@test.com / admin123</code>
          </div>
          <p className="auth-link">No account? <Link to="/register">Register here</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;