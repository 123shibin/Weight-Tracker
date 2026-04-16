import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register"; 
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Addweight from "./components/AddWeight";
import ComparisonCard from "./components/ComparisonCard";
import ReminderCard from "./components/ReminderCard";
import WeightTable from "./components/WeightTable";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/addweight" element={<Addweight />} />
      <Route path="/comparison" element={<ComparisonCard />} /> 
      <Route path="/reminder" element={<ReminderCard />} />
      <Route path="/weighttable" element={<WeightTable />} /> 
      <Route path="/navbar" element={<Navbar />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;