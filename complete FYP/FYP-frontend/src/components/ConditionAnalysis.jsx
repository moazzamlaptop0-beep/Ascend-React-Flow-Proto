import React from 'react';

const ConditionAnalysis = () => {
  const conditions = [
    { id: "01", name: "Skin Cancer", details: "Melanoma, BKK, BCC, and more", color: "from-red-500/20 to-transparent" },
    { id: "02", name: "Precancerous", details: "Blue & Dysplastic nevus", color: "from-orange-500/20 to-transparent" },
    { id: "03", name: "Benign Formations", details: "Moles, Angioma, Dermatofibroma", color: "from-blue-500/20 to-transparent" },
    { id: "04", name: "Papilloma Virus", details: "Warts, Papillomas, Mollusks", color: "from-purple-500/20 to-transparent" },
    { id: "05", name: "6 Types of Acne", details: "Comprehensive acne classification", color: "from-teal-500/20 to-transparent" },
  ];

  return (
    <section className="relative bg-[#f8fafc] py-24 px-6 overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Unique Header Design */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#3fd5c2] font-bold tracking-widest uppercase text-sm mb-3 block">Instant Diagnosis</span>
            <h2 className="text-[#0c2b5e] text-4xl md:text-5xl font-extrabold tracking-tight">
              What can AI detect in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3fd5c2] to-blue-600">60 Seconds?</span>
            </h2>
          </div>
          <p className="text-gray-500 text-lg md:max-w-xs border-l-4 border-[#3fd5c2] pl-4 italic">
            High-precision analysis of skin pathologies using neural networks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Modern List */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {conditions.map((item) => (
              <div 
                key={item.id}
                className={`group relative bg-white border border-slate-100 p-6 rounded-3xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 overflow-hidden`}
              >
                {/* Gradient Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 flex items-start gap-5">
                  <span className="text-3xl font-black text-slate-100 group-hover:text-[#3fd5c2]/20 transition-colors duration-500 uppercase">
                    {item.id}
                  </span>
                  <div>
                    <h3 className="text-[#0c2b5e] font-bold text-xl mb-1 flex items-center gap-2">
                      {item.name}
                      <span className="w-2 h-2 rounded-full bg-[#3fd5c2] animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: AI Visualizer Card */}
          <div className="lg:col-span-4 bg-[#0c2b5e] rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-center items-center text-center shadow-2xl group">
            {/* Animated Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-64 h-64 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
               <div className="absolute w-80 h-80 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            </div>

            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-tr from-[#3fd5c2] to-cyan-300 rounded-3xl rotate-12 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(63,213,194,0.5)] group-hover:rotate-0 transition-transform duration-700">
                <svg className="w-12 h-12 text-[#0c2b5e]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm0 3a5 5 0 110 10 5 5 0 010-10z"/>
                </svg>
              </div>
              <h4 className="text-2xl font-bold mb-4">Neural Network Core</h4>
              <p className="text-blue-100/70 leading-relaxed mb-6">
                Our AI engine is trained on 100,000+ clinical images to provide dermatologist-level insights.
              </p>
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                AI System Online
              </div>
            </div>
          </div>

        </div>

        {/* Floating Tip Banner */}
        <div className="mt-12 bg-white border border-slate-100 p-2 rounded-3xl shadow-lg flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto">
            <div className="bg-[#fdf2e9] text-[#e67e22] px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap">
              PRO TIP
            </div>
            <p className="text-gray-600 text-sm md:text-base px-4 py-2">
              For <b>98% accuracy</b>, ensure your photos are taken in natural daylight without zoom.
            </p>
        </div>

      </div>
    </section>
  );
};

export default ConditionAnalysis;