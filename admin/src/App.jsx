import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  if (!aToken && !dToken) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (allowedRole === 'admin' && !aToken) {
    return <Navigate to="/doctor-dashboard" replace />;
  }
  if (allowedRole === 'doctor' && !dToken) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  if (!aToken && !dToken) {
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            {/* Admin Routes */}
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute allowedRole="admin">
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/all-appointments" 
              element={
                <ProtectedRoute allowedRole="admin">
                  <AllAppointments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add-doctor" 
              element={
                <ProtectedRoute allowedRole="admin">
                  <AddDoctor />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor-list" 
              element={
                <ProtectedRoute allowedRole="admin">
                  <DoctorsList />
                </ProtectedRoute>
              } 
            />

            {/* Doctor Routes */}
            <Route 
              path="/doctor-dashboard" 
              element={
                <ProtectedRoute allowedRole="doctor">
                  <DoctorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor-appointments" 
              element={
                <ProtectedRoute allowedRole="doctor">
                  <DoctorAppointment />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor-profile" 
              element={
                <ProtectedRoute allowedRole="doctor">
                  <DoctorProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor-profile/:id" 
              element={
                <ProtectedRoute allowedRole="doctor">
                  <DoctorProfile />
                </ProtectedRoute>
              } 
            />

            {/* Default Routes */}
            <Route path="/" element={
              <Navigate to={aToken ? "/admin-dashboard" : "/doctor-dashboard"} replace />
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;