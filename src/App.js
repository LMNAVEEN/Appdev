// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignUpPage';
import HomePage from './HomePage';
import AdminDashboard from './AdminDashboard';
import BookingForm from './BookingForm';
import BookingHistory from './BookingHistory';
import HallList from './HallList';
import PaymentPage from './PaymentPage';
import EventCategoriesPage from './EventCategoriesPage';
import EventDetailsPage from './EventDetailsPage';
import AvailableHallsPage from './AvailableHallsPage';
import ProfilePage from './ProfilePage';
import AdminsPage from './AdminsPage'; // Import AdminsPage
import AdminLoginPage from './AdminLoginPage'; // Import AdminLoginPage
import ProtectedRoute from './ProtectedRoute';
import Navbar from './Navbar';
import Footer from './Footer'; // Import Footer component
import PaymentSuccessPage from './PaymentSuccessPage';
import { ThemeProvider } from './ThemeContext'; // Import ThemeProvider
import './App.css'; // Import the CSS file for theme

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeProvider>
      <Router>
        <Navbar onToggleTheme={toggleTheme} isDarkMode={theme === 'dark'} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-form"
            element={
              <ProtectedRoute>
                <BookingForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-history"
            element={
              <ProtectedRoute>
                <BookingHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hall-list"
            element={
              <ProtectedRoute>
                <HallList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/event-categories"
            element={
              <ProtectedRoute>
                <EventCategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/event-details/:category"
            element={
              <ProtectedRoute>
                <EventDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/available-halls"
            element={
              <ProtectedRoute>
                <AvailableHallsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-success"
            element={
              <ProtectedRoute>
                <PaymentSuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admins"
            element={
              <ProtectedRoute>
                <AdminsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
