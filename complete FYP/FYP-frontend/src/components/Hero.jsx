import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. React Router se useNavigate import kiya
import { Smartphone, Cpu, FileText, MessageSquare, ScanLine } from 'lucide-react';
// Tasveer yahan import ho rahi hai
import heroBg from '../assets/images/hero-bg.png.png'; 

const Hero = () => {
  const navigate = useNavigate(); // 2. Hook ko initialize kiya

  const steps = [
    {
      id: 1,
      title: "Take a photo of a skin concern",
      icon: <Smartphone size={24} className="text-white" />,
      gradient: "from-blue-400 to-blue-600",
      shadow: "shadow-blue-500/50"
    },
    {
      id: 2,
      title: "AI instantly analyzes your photo",
      icon: <Cpu size={24} className="text-white" />,
      gradient: "from-slate-600 to-slate-800",
      shadow: "shadow-slate-500/50"
    },
    {
      id: 3,
      title: "Get a personalized PDF report",
      icon: <FileText size={24} className="text-white" />,
      gradient: "from-emerald-400 to-emerald-600",
      shadow: "shadow-emerald-500/50"
    },
    {
      id: 4,
      title: "The AI Consultant explains your result",
      icon: <MessageSquare size={24} className="text-white" />,
      gradient: "from-purple-400 to-purple-600",
      shadow: "shadow-purple-500/50"
    }
  ];

  return (
    <main className="flex-1 flex flex-col md:flex-row px-6 md:px-12 py-12 gap-10 relative w-full items-center">
      
      {/* Left Content (Text & Steps) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center z-10">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-12 text-white drop-shadow-md tracking-tight">
          Check your skin!
        </h2>
        
        {/* Animated Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 mb-12">
          {steps.map((step) => (
            <div key={step.id} className="group flex items-center gap-5 cursor-default transition-all duration-300 hover:translate-x-2">
              <div className={`relative flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg ${step.shadow} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                {step.icon}
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:animate-ping"></div>
              </div>
              
              <div>
                <span className="text-[10px] font-bold border border-white/30 text-white/90 px-3 py-1 rounded-full mb-2 inline-block tracking-widest bg-white/5 backdrop-blur-sm shadow-sm transition-colors group-hover:bg-white/20">
                  STEP {step.id}
                </span>
                <p className="text-sm font-medium text-blue-100 pr-4 group-hover:text-white transition-colors duration-300">
                  {step.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Glowing Button */}
        <div className="mt-4">
          {/* 3. Button par onClick lagaya jo /try-now par le jayega */}
          <button 
            onClick={() => navigate('/try-now')} 
            className="relative overflow-hidden group bg-[#ff3333] hover:bg-[#ff4d4d] transition-all duration-300 text-white font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(255,51,51,0.6)] hover:shadow-[0_0_30px_rgba(255,51,51,0.8)] hover:-translate-y-1"
          >
            <span className="relative z-10 tracking-wide">GET INSTANT RESULT</span>
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:animate-[shine_1.5s_ease-in-out_infinite]"></div>
          </button>
        </div>

        <p className="text-xs text-blue-200 mt-8 max-w-lg leading-relaxed opacity-80">
          * The scan result is not a diagnosis. To obtain an accurate diagnosis and a treatment recommendation, consult your doctor.
        </p>
      </div>

      {/* Right Content - Image Background with Floating Scanner */}
      <div className="w-full md:w-1/2 flex justify-center items-center relative mt-16 md:mt-0 h-[450px] md:h-[550px]">
        
        {/* Background Image & Gradient Blend */}
        <div className="absolute inset-0 md:-right-12 z-0 rounded-l-[60px] overflow-hidden">
          <img 
            src={heroBg} 
            alt="AI Skin Analysis" 
            className="w-full h-full object-cover object-left opacity-90"
          />
          {/* Gradient Overlay (Taake background blue color ke sath mix ho jaye) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b3d7a] via-[#1b3d7a]/60 to-transparent"></div>
        </div>

        {/* Floating Glassmorphism Container */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl relative flex items-center justify-center p-8 group hover:-translate-y-2 transition-all duration-700 rounded-[40px] z-10">
          
          {/* Inner Scanner UI */}
          <div className="flex flex-col md:flex-row items-center gap-6 z-20">
            
            {/* The Target Box */}
            <div className="relative p-6 border-2 border-dashed border-white/40 rounded-2xl bg-black/40 backdrop-blur-lg shadow-inner overflow-hidden">
               {/* Animated Scanning Line */}
               <div className="absolute top-0 left-0 w-full h-[2px] bg-green-400 shadow-[0_0_15px_rgba(74,222,128,1)] animate-[pulse_2s_ease-in-out_infinite] z-30 translate-y-[40px]"></div>
               
               {/* Skin/Mole Representation */}
               <div className="w-20 h-20 bg-[#d2a38c] rounded-xl relative flex justify-center items-center shadow-md">
                  <div className="w-5 h-5 bg-amber-900 rounded-full blur-[1px] shadow-inner"></div>
               </div>

               {/* Corner Accents */}
               <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-green-400/80 -translate-x-1 -translate-y-1 rounded-tl-sm"></div>
               <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-green-400/80 translate-x-1 -translate-y-1 rounded-tr-sm"></div>
               <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-green-400/80 -translate-x-1 translate-y-1 rounded-bl-sm"></div>
               <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-green-400/80 translate-x-1 translate-y-1 rounded-br-sm"></div>
            </div>

            {/* Hint Text */}
            <div className="text-center md:text-left">
              <div className="h-0.5 w-12 bg-white/40 rounded-full mb-3 mx-auto md:mx-0"></div>
              <p className="text-sm text-white/90 max-w-[180px] font-medium leading-relaxed drop-shadow-md">
                Take a photo of a mole and receive your risk assessment*
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <ScanLine className="absolute bottom-6 right-6 text-white/20" size={100} />
        </div>
      </div>
      
      {/* Adding a custom animation keyframe */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shine {
          100% { left: 125%; }
        }
      `}} />
    </main>
  );
};

export default Hero;