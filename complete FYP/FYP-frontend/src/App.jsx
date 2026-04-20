import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Components Imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesMarquee from './components/FeaturesMarquee'; 
import ConditionAnalysis from './components/ConditionAnalysis';
import LifeSavingDataView from './components/LifeSavingDataView';
import WhyUseAiDermatologist from './components/WhyUseAiDermatologist';
import HowToUseAiDermatologist from './components/HowToUseAiDermatologist'; 
import HowDoesAiAnalyze from './components/HowDoesAiAnalyze';
import Footer from './components/Footer';

// Pages Imports
import LoginPage from './components/LoginPage'; 
import RegisterPage from './components/RegisterPage'; 
import TryNowPage from './components/TryNowPage'; 
import AdminDashboard from "./components/AdminDashboard"; // Admin Dashboard Import kiya

function AppContent() {
  const location = useLocation();
  
  // In pages par Navbar aur Footer hide rahenge
  const hideLayout = location.pathname === '/try-now' || location.pathname === '/admin-dashboard';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1b3d] via-[#06142e] to-[#020813] text-white font-sans flex flex-col">
      
      {/* Agar Scanner ya Admin Dashboard nahi hai, tabhi Navbar dikhao */}
      {!hideLayout && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={
            <>
              <Hero />
              <FeaturesMarquee />
              <ConditionAnalysis />
              <LifeSavingDataView />
              <WhyUseAiDermatologist />
              <HowToUseAiDermatologist />
              <HowDoesAiAnalyze />
            </>
          } />

          {/* AI Scanner Page */}
          <Route path="/try-now" element={<TryNowPage />} />
          
          {/* Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Dashboards */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          
          <Route path="/doctor-dashboard" element={
            <div className="p-20 text-center text-4xl text-white font-bold h-screen flex items-center justify-center">
              Doctor Dashboard Coming Soon
            </div>
          } />
        </Routes>
      </main>

      {/* Footer bhi in pages par hide kar diya */}
      {!hideLayout && <Footer />}
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;