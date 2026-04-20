import React from 'react';

const FeaturesMarquee = () => {
  // Features array with exact text and bold formatting from your image
  const features = [
    {
      id: 1,
      text: (
        <>
          <span className="font-bold">Detects 58+ skin diseases</span>, including melanoma and skin cancer
        </>
      ),
    },
    {
      id: 2,
      text: (
        <>
          <span className="font-bold">Over 97% accuracy</span>, based on AI and clinical database
        </>
      ),
    },
    {
      id: 3,
      text: (
        <>
          <span className="font-bold">Result</span> within <span className="font-bold">1 minute</span>
        </>
      ),
    },
    {
      id: 4,
      text: (
        <>
          Enables <span className="font-bold">instant at-home screening</span>
        </>
      ),
    },
    {
      id: 5,
      text: (
        <>
          <span className="font-bold">24/7 personal AI Consultant</span>
        </>
      ),
    },
  ];

  // SVG Icon for the green checkmark
  const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <section className="bg-white py-16 overflow-hidden">
      {/* Header Section */}
      <div className="text-center px-4 mb-10 max-w-3xl mx-auto">
        <h2 className="text-[#0c2b5e] text-3xl md:text-4xl font-bold mb-3">
          Why should you use AI Dermatologist?
        </h2>
        <p className="text-gray-600 text-lg">
          Developed with dermatologists and powered by artificial intelligence.
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative flex overflow-hidden group bg-slate-50/50 py-6 border-y border-slate-100">
        
        {/* Fading edges for a professional look */}
        <div className="absolute left-0 top-0 z-10 w-24 h-full bg-gradient-to-r from-white to-transparent"></div>
        <div className="absolute right-0 top-0 z-10 w-24 h-full bg-gradient-to-l from-white to-transparent"></div>

        {/* Animated Track - YAHAN CLASS UPDATE KI GAYI HAI */}
        <div className="flex w-max animate-custom-marquee group-hover:[animation-play-state:paused]">
          
          {/* Render the list TWICE for seamless infinite scrolling */}
          {[...Array(2)].map((_, arrayIndex) => (
            <div key={arrayIndex} className="flex gap-6 px-3">
              {features.map((feature) => (
                <div
                  key={`${arrayIndex}-${feature.id}`}
                  className="flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-sm border border-slate-200 text-[#0c2b5e] whitespace-nowrap transition-transform hover:scale-105 hover:shadow-md cursor-default"
                >
                  <CheckIcon />
                  <span className="text-base text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default FeaturesMarquee;