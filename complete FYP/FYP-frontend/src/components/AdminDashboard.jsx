import React, { useState, useEffect } from 'react';
import { Users, Scan, Activity, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total_users: 0, total_scans: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-[#0c2b5e] text-white p-6 shadow-xl flex flex-col">
        <h2 className="text-2xl font-black mb-10 tracking-tight">ADMIN PANEL</h2>
        <nav className="space-y-4 flex-1">
          <div className="flex items-center gap-3 p-3 bg-blue-800/50 rounded-xl cursor-pointer border border-blue-400/30">
            <Activity size={20} /> 
            <span className="font-semibold">Dashboard</span>
          </div>
        </nav>
        
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-3 p-3 hover:bg-red-600 rounded-xl cursor-pointer transition-all duration-300 mt-auto border border-transparent hover:border-red-400"
        >
          <LogOut size={20} /> 
          <span className="font-semibold">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Welcome Back, Admin!</h1>
          <p className="text-gray-500 font-medium mt-2">Real-time system overview and analytics.</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* User Card */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs text-blue-600 font-black uppercase tracking-widest mb-2">Total Registered Users</p>
              {/* Number ka color yahan black kiya hai */}
              <h3 className="text-5xl font-black text-gray-900">{stats.total_users}</h3>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl group-hover:scale-110 transition-transform">
               <Users size={40} className="text-blue-600" />
            </div>
          </div>

          {/* Scan Card */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs text-green-600 font-black uppercase tracking-widest mb-2">Total AI Scans Done</p>
              {/* Number ka color yahan black kiya hai */}
              <h3 className="text-5xl font-black text-gray-900">{stats.total_scans}</h3>
            </div>
            <div className="p-4 bg-green-50 rounded-2xl group-hover:scale-110 transition-transform">
               <Scan size={40} className="text-green-600" />
            </div>
          </div>

        </div>

        {/* System Info Section */}
        <div className="bg-white rounded-[2rem] shadow-sm p-8 border border-gray-100">
          <h3 className="text-xl font-black mb-6 text-gray-900 uppercase tracking-tight">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <span className="text-gray-600 font-bold">PostgreSQL Database</span>
                <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-black">CONNECTED ✅</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <span className="text-gray-600 font-bold">AI Prediction Engine</span>
                <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-black">ONLINE 🚀</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;