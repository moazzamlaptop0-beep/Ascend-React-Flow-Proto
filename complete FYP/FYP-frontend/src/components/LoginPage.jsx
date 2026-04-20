import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserCog, Stethoscope, Sparkles, Lock, Mail, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('ai_derma'); // Default role state
  const [showPassword, setShowPassword] = useState(false);
  
  // API states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const roles = [
    { id: 'admin', label: 'Admin', icon: <UserCog size={20} /> },
    { id: 'doctor', label: 'Doctor', icon: <Stethoscope size={20} /> },
    { id: 'ai_derma', label: 'AI User', icon: <Sparkles size={20} /> },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Backend ko exact label bhej rahe hain (e.g., 'Admin', 'Doctor', 'AI User')
    const selectedRoleLabel = roles.find(r => r.id === role).label;

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            email: email, 
            password: password, 
            role: selectedRoleLabel 
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // 1. Browser local storage mein user data save karein
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // 2. Role check karke sahi page par bhejein
        if (data.user.role === 'Admin') {
            navigate('/admin-dashboard');
        } else {
            // window.location.href use karne se Navbar refresh ho jata hai
            window.location.href = '/'; 
        }
      } else {
        setError(data.error || "Login failed!");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Server se connect nahi ho pa raha!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-[#3fd5c2] to-purple-500"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-50 rounded-full blur-3xl opacity-60"></div>

      <div className="w-full max-w-[450px] relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-[#0c2b5e] text-3xl font-black tracking-tight mb-2">
            AI DERMATOLOGIST
          </h1>
          <p className="text-gray-500 font-medium">Please select your portal to continue</p>
        </div>

        <div className="bg-white border border-slate-100 shadow-2xl rounded-[2.5rem] p-8 md:p-10">
          
          {/* Role Selector */}
          <div className="flex bg-slate-50 p-1.5 rounded-2xl mb-6">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 font-bold text-sm ${
                  role === r.id 
                  ? 'bg-white text-[#0c2b5e] shadow-md' 
                  : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {r.icon}
                <span className="hidden sm:inline">{r.label}</span>
              </button>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-4 text-sm font-bold text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0c2b5e] ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent focus:border-[#3fd5c2] focus:bg-white rounded-2xl outline-none transition-all text-gray-700"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-[#0c2b5e]">Password</label>
                <a href="#" className="text-xs font-bold text-[#3fd5c2] hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-transparent focus:border-[#3fd5c2] focus:bg-white rounded-2xl outline-none transition-all text-gray-700"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 group
                ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#0c2b5e] hover:bg-[#163a75] shadow-blue-900/20 active:scale-95'}`}
            >
              {loading ? "Logging in..." : `Login to ${roles.find(r => r.id === role).label} Portal`}
              {!loading && (
                <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  →
                </div>
              )}
            </button>
          </form>

          {/* Registration Link */}
          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#3fd5c2] font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-xs text-gray-400 font-medium">
          Protected by AI-Derm Security. Need help? <span className="text-gray-600 underline cursor-pointer">Contact Support</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;