import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import { FeedbackProvider } from "./contexts/FeedbackContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { UserProfileProvider } from "./contexts/UserProfileContext";
import GlobalFeedbackOverlay from "./components/GlobalFeedbackOverlay";
import UpdateNotification from "./components/UpdateNotification";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import JobDetailsPage from "./pages/JobDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FeedbackDemoPage from "./pages/FeedbackDemoPage";

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <BrowserRouter basename="/Jobs">
        <FeedbackProvider>
          <AuthProvider>
            <UserProfileProvider>
              <FavoritesProvider>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
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
                <UpdateNotification />
              </FavoritesProvider>
            </UserProfileProvider>
          </AuthProvider>
        </FeedbackProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
