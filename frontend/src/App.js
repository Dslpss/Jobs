import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import { FeedbackProvider } from "./contexts/FeedbackContext";
import GlobalFeedbackOverlay from "./components/GlobalFeedbackOverlay";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import JobDetailsPage from "./pages/JobDetailsPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FeedbackDemoPage from "./pages/FeedbackDemoPage";

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <BrowserRouter>
        <FeedbackProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/demo" element={<FeedbackDemoPage />} />
              <Route
                path="/job/:id"
                element={
                  <ProtectedRoute>
                    <JobDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminPage />
                  </AdminRoute>
                }
              />
            </Routes>
            <Footer />
            <Toaster />
            <GlobalFeedbackOverlay />
          </AuthProvider>
        </FeedbackProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
