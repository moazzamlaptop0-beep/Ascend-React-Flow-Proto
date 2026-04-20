import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Sparkles, Stethoscope } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('ai_derma'); // Default: Patient/User
  const [showPassword, setShowPassword] = useState(false);

  // States backend connect karne ke liye
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const roles = [
    { id: 'ai_derma', label: 'AI User', icon: <Sparkles size={18} /> },
    { id: 'doctor', label: 'Doctor', icon: <Stethoscope size={18} /> },
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!terms) {
      setError("Please agree to the Terms of Service.");
      return;
    }

    setLoading(true);
    setError(null);

    const selectedRoleLabel = roles.find(r => r.id === role).label;

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email, password: password, role: selectedRoleLabel }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Account created successfully! Please login.");
        navigate('/login'); // Register hone ke baad seedha login page par
      } else {
        setError(data.error || "Registration failed!");
      }
    } catch (err) {
      console.error("Register Error:", err);
      setError("Server se connect nahi ho pa raha! Backend check karein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans relative overflow-hidden pt-24 pb-12">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-[#3fd5c2] to-purple-500"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-50 rounded-full blur-3xl opacity-60"></div>

      <div className="w-full max-w-[500px] relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-[#0c2b5e] text-3xl font-black tracking-tight mb-2">
            Create an Account
          </h1>
          <p className="text-gray-500 font-medium">Join AI Dermatologist today</p>
        </div>

        <div className="bg-white border border-slate-100 shadow-2xl rounded-[2.5rem] p-8 md:p-10">
          
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
                <span>{r.label}</span>
              </button>
            ))}
          </div>

          {/* Error Message UI */}
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-4 text-sm font-bold text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#0c2b5e] ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-transparent focus:border-[#3fd5c2] focus:bg-white rounded-2xl outline-none transition-all text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#0c2b5e] ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-transparent focus:border-[#3fd5c2] focus:bg-white rounded-2xl outline-none transition-all text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#0c2b5e] ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-transparent focus:border-[#3fd5c2] focus:bg-white rounded-2xl outline-none transition-all text-gray-700"
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

            <div className="flex items-start gap-3 pt-2">
              <input 
                type="checkbox" 
                id="terms"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#3fd5c2] bg-slate-50 border-gray-300 rounded focus:ring-[#3fd5c2] cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-gray-500 leading-tight cursor-pointer">
                I agree to the <span className="text-[#0c2b5e] font-bold hover:underline">Terms of Service</span> and <span className="text-[#0c2b5e] font-bold hover:underline">Privacy Policy</span>.
              </label>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full mt-4 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 group
                ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#3fd5c2] hover:bg-[#35b8a7] shadow-teal-500/30 active:scale-95'}`}
            >
              {loading ? "Creating Account..." : `Create ${role === 'doctor' ? 'Doctor' : ''} Account`}
              {!loading && (
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  →
                </div>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-[#0c2b5e] font-bold hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;