import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate import kiya

const HowToUseAiDermatologist = () => {
  const navigate = useNavigate(); // 2. Hook initialize kiya

  const steps = [
    {
      id: "01",
      title: "Take a photo*",
      description: "Keep zoomed at the closest distance (less than 10 cm), keep in focus and center only the skin mark (without hair, wrinkles and other objects).",
      gradient: "from-pink-500 to-rose-500",
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
          <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
        </svg>
      )
    },
    {
      id: "02",
      title: "Identify and send*",
      description: "Send your photo to the Artificial Intelligence. The system will analyze it and send you a risk assessment.",
      gradient: "from-cyan-400 to-blue-500",
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v3m0 12v3m9-9h-3M6 12H3m13.364-6.364l-2.121 2.121M7.757 16.243l-2.122 2.122M18.364 18.364l-2.121-2.121M7.757 7.757L5.636 5.636" />
        </svg>
      )
    },
    {
      id: "03",
      title: "Receive your risk assessment*",
      description: "Get the result within 60 seconds and advice on the next steps to take.",
      gradient: "from-emerald-400 to-teal-500",
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9l2 2 4-4" />
        </svg>
      )
    }
  ];

  return (
    // Background White aur Text Black/Blue kar diya gaya hai
    <section className="relative w-full py-20 overflow-hidden bg-white font-sans text-gray-800">
      
      {/* Background Glowing Orbs (Softened for white theme) */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-200/40 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-200/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center">
        
        {/* Title Section */}
        <h2 className="text-[#0c2b5e] text-4xl md:text-5xl font-extrabold text-center mb-16 drop-shadow-sm">
          How to use <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500">AI Dermatologist?</span>
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full mb-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="group relative bg-white border border-gray-100 shadow-xl rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl flex flex-col items-center text-center overflow-hidden"
            >
              {/* Giant Background Number (Light Gray) */}
              <span className="absolute -top-6 -right-6 text-9xl font-black text-gray-50 group-hover:text-gray-100 transition-colors duration-500 select-none">
                {step.id}
              </span>

              {/* Icon Container with Glow */}
              <div className="relative mb-8 z-10">
                <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse`}></div>
                <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-tr ${step.gradient} flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-500`}>
                  {step.icon}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-bold text-[#0c2b5e] mb-4 z-10">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed z-10">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="relative group mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff4d4f] to-[#ff7875] rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
          {/* 3. Button mein onClick lagaya */}
          <button 
            onClick={() => navigate('/try-now')}
            className="relative px-12 py-4 bg-gradient-to-r from-[#ff4d4f] to-[#ff7875] text-white text-lg font-bold rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
          >
            Try Now!
          </button>
        </div>

        {/* Footer Notes */}
        <div className="text-center w-full max-w-2xl bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <p className="text-gray-500 text-sm mb-2">
            <span className="text-pink-500 font-bold">*</span> You can take a photo on your mobile phone or upload a photo from your computer.
          </p>
          <p className="text-gray-500 text-sm">
            <span className="text-cyan-500 font-bold">**</span> You can view your results online or send them to your email address.
          </p>
        </div>

      </div>
    </section>
  );
};

export default HowToUseAiDermatologist;