import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReportForm from "./pages/ReportForm";
import ReportList from "./pages/ReportList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-report" element={<ReportForm />} />
        <Route path="/reports" element={<ReportList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;