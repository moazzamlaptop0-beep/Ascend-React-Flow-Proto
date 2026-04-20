import React, { useState } from 'react';

const AiScanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Tasveer select karne ka function
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null); // Nayi tasveer aane par purana result hata do
      setError(null);
    }
  };

  // Python Backend ko tasveer bhejne ka function
  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      // Yahan Python Flask API ko call kar rahe hain
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server response wasn't OK");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error analyzing image:", err);
      setError("AI se connect karne mein masla aa raha hai. Kya backend chal raha hai?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-white font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="text-[#3fd5c2] font-bold tracking-widest uppercase text-sm mb-3 block">
            Live Diagnostics
          </span>
          <h2 className="text-[#0c2b5e] text-4xl font-extrabold tracking-tight">
            Upload Image for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3fd5c2] to-blue-600">AI Analysis</span>
          </h2>
        </div>

        <div className="bg-[#f8fafc] border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-10 items-center">
          
          {/* Left Side: Upload Area */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <label 
              htmlFor="image-upload" 
              className={`w-full h-64 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                previewUrl ? 'border-[#3fd5c2] bg-teal-50/50' : 'border-slate-300 hover:border-[#3fd5c2] hover:bg-slate-50'
              }`}
            >
              {previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="h-full w-full object-cover rounded-3xl p-1"
                />
              ) : (
                <div className="text-center p-6">
                  <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                  </svg>
                  <p className="text-slate-500 font-medium">Click to upload clinical image</p>
                  <p className="text-slate-400 text-sm mt-2">JPG, PNG up to 5MB</p>
                </div>
              )}
              <input 
                id="image-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>

            <button
              onClick={handleAnalyze}
              disabled={!selectedFile || loading}
              className={`mt-6 w-full py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg flex justify-center items-center gap-2 ${
                !selectedFile || loading
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#0c2b5e] to-blue-800 text-white hover:shadow-blue-900/30 hover:-translate-y-1'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Data...
                </>
              ) : (
                'Analyze with AI'
              )}
            </button>
          </div>

          {/* Right Side: Results Display */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            {error ? (
              <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-200">
                <p className="font-bold">⚠️ Error</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            ) : result ? (
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-fade-in-up">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Scan Complete
                </div>
                
                <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-1">Detected Condition</h3>
                <h4 className="text-[#0c2b5e] text-2xl font-black mb-6">{result.disease}</h4>
                
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-slate-600 font-medium">AI Confidence</span>
                    <span className="text-[#3fd5c2] font-black text-xl">{result.confidence}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#3fd5c2] to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                  <p className="text-slate-400 text-xs mt-3 italic">
                    *This is an AI prediction. Please consult a certified dermatologist for medical advice.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50">
                <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h4 className="text-[#0c2b5e] font-bold text-lg mb-2">Awaiting Image</h4>
                <p className="text-slate-500 text-sm">Upload a clear photo of the skin condition to see the AI analysis results here.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AiScanner;