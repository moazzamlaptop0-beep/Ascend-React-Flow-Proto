import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, CheckCircle, Shield, Clock, 
  Activity, Info, X, Sparkles, ArrowLeft, Cpu
} from 'lucide-react';

const TryNowPage = () => {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); 
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [result, setResult] = useState(null); 
  const [error, setError] = useState(null); 
  
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));
      setResult(null); 
      setError(null);
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => { setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const clearImage = () => {
    setImage(null);
    setSelectedFile(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // --- UPDATED ANALYZE FUNCTION ---
  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    // 1. LocalStorage se user data nikalna
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const userId = loggedInUser ? loggedInUser.id : null;

    const formData = new FormData();
    formData.append("image", selectedFile);
    
    // 2. User ID ko FormData mein add karna (Backend ke liye)
    if (userId) {
      formData.append("user_id", userId);
    } else {
      console.warn("User ID not found, scan might not be saved to history.");
    }

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Connection Error:", err);
      setError("Backend se connect nahi ho pa raha. Kya python server chal raha hai?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 flex flex-col items-center overflow-x-hidden relative">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* --- PROFESSIONAL HEADER --- */}
      <header className="w-full px-6 py-4 flex items-center justify-between z-20 backdrop-blur-md bg-white/70 sticky top-0 border-b border-gray-100">
        <button 
          onClick={() => navigate('/')} 
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-sm hover:shadow-md text-blue-600 font-bold transition-all border border-gray-200"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Exit Scan</span>
        </button>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
          <Activity className="text-blue-600 animate-pulse" size={22} />
          <span className="font-bold tracking-tight text-blue-900 hidden sm:inline uppercase text-sm">Derma AI Scanner</span>
        </div>
      </header>

      <div className="max-w-5xl w-full flex flex-col items-center z-10 py-12 px-6">
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4 border border-blue-100">
            <Sparkles size={14} /> AI-Powered Skin Analysis
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 text-[#0c2b5e] tracking-tight">
            Start Your Analysis
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto font-medium">
            Upload or drag a high-quality image of the affected area for a deep neural scan.
          </p>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-10 items-center justify-center">
          <div className="w-full lg:w-3/5">
            <div 
              className={`relative group w-full min-h-[450px] rounded-[3rem] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-8 text-center
                ${isDragging ? 'border-blue-500 bg-blue-50 scale-[1.01]' : 'border-gray-200 bg-gray-50/50 hover:border-blue-300'}
                ${result ? 'border-green-400 bg-green-50/30' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

              {!image ? (
                <>
                  <div className="mb-8 relative">
                    <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center relative z-10 border border-gray-100 group-hover:scale-110 transition-transform duration-500">
                        <UploadCloud className="text-blue-500" size={40} />
                    </div>
                    <div className="absolute -inset-4 bg-blue-400/10 blur-2xl rounded-full animate-pulse"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to Scan?</h3>
                  <p className="text-gray-400 font-medium mb-10 text-sm italic">"High lighting ensures 97% accuracy"</p>
                  
                  <div className="button-wrapper">
                    <button 
                        onClick={() => fileInputRef.current.click()}
                        className="moving-ai-btn"
                    >
                        <div className="btn-content">
                            <Cpu size={20} className="icon-move" />
                            <span>CHOOSE IMAGE</span>
                        </div>
                        <div className="btn-glow"></div>
                    </button>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center animate-zoomIn">
                  <div className="relative">
                    <img src={image} alt="Preview" className="max-h-[250px] rounded-3xl shadow-2xl border-4 border-white mb-6 object-contain" />
                    
                    {!loading && !result && (
                      <button onClick={clearImage} className="absolute -top-4 -right-4 p-2.5 bg-white text-red-500 rounded-full shadow-xl border border-gray-100 hover:bg-red-50 transition-all">
                        <X size={20} />
                      </button>
                    )}
                  </div>
                  
                  {error && <div className="text-red-500 font-bold mb-4">{error}</div>}

                  {result ? (
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 w-full animate-fadeIn">
                      <div className="flex items-center justify-center gap-2 text-green-600 font-bold uppercase text-xs mb-2">
                        <CheckCircle size={16} /> Analysis Complete
                      </div>
                      <h2 className="text-[#0c2b5e] text-2xl font-black mb-2">{result.disease}</h2>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-500 text-sm font-bold">Confidence</span>
                        <span className="text-blue-600 font-black">{result.confidence}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-4">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-1000" style={{ width: `${result.confidence}%` }}></div>
                      </div>
                      <button onClick={clearImage} className="text-sm text-gray-400 hover:text-blue-500 font-bold underline">Scan Another Image</button>
                    </div>
                  ) : (
                    <button 
                      onClick={handleAnalyze} 
                      disabled={loading}
                      className={`px-10 py-4 font-bold rounded-2xl shadow-lg transition-all flex items-center gap-3 active:scale-95 group
                        ${loading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#0c2b5e] text-white hover:shadow-blue-900/20 hover:-translate-y-1'}`}
                    >
                      {loading ? (
                        <><Activity size={20} className="animate-spin" /> ANALYZING NEURAL DATA...</>
                      ) : (
                        <><Sparkles size={20} /> RUN AI DIAGNOSTICS</>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes float { 
            0%, 100% { transform: translateY(0px) rotate(0deg); } 
            50% { transform: translateY(-10px) rotate(1deg); } 
        }
        @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 0.5; }
            100% { transform: scale(1.3); opacity: 0; }
        }

        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-zoomIn { animation: zoomIn 0.4s ease-out forwards; }

        .button-wrapper { position: relative; padding: 20px; }

        .moving-ai-btn {
            position: relative;
            background: #fff;
            padding: 1.2rem 3rem;
            border-radius: 100px;
            font-weight: 800;
            color: #2563eb;
            border: 2px solid #2563eb;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(37, 99, 235, 0.1);
            animation: float 4s infinite ease-in-out;
        }

        .btn-content {
            display: flex;
            align-items: center;
            gap: 12px;
            position: relative;
            z-index: 2;
        }

        .moving-ai-btn:hover {
            background: #2563eb;
            color: #fff;
            transform: scale(1.05) translateY(-5px);
            box-shadow: 0 20px 40px rgba(37, 99, 235, 0.3);
        }

        .moving-ai-btn::before {
            content: "";
            position: absolute;
            top: 0; left: -100%;
            width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            transition: 0.5s;
        }

        .moving-ai-btn:hover::before { left: 100%; }

        .button-wrapper::after {
            content: "";
            position: absolute;
            top: 50%; left: 50%;
            width: 100%; height: 100%;
            border: 2px solid #2563eb;
            border-radius: 100px;
            transform: translate(-50%, -50%);
            animation: pulse-ring 2s infinite;
            pointer-events: none;
        }

        .icon-move { transition: transform 0.3s; }
        .moving-ai-btn:hover .icon-move { transform: rotate(360deg); }
      `}} />
    </div>
  );
};

export default TryNowPage;