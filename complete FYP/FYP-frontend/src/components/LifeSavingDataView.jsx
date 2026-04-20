import React from 'react';

const LifeSavingDataView = () => {
  const cancerStats = [
    {
      id: 1,
      title: "GLOBAL IMPACT",
      fact: ">2 people die of skin cancer every hour worldwide.",
      details: "Skin cancer is the most common cancer in the US & globally.",
      badgeColor: "bg-[#4285F4]" // Google Blue
    },
    {
      id: 2,
      title: "RAPID SPREAD",
      fact: "Melanoma can spread earlier and more quickly.",
      details: "It's the second most common cancer in ages 15-29.",
      badgeColor: "bg-[#10b981]" // Emerald/Teal
    },
    {
      id: 3,
      title: "LIFETIME RISK",
      fact: "1 in 50 people develop skin cancer.",
      details: "Early detection is key to survival.",
      badgeColor: "bg-[#a855f7]" // Purple
    },
    {
      id: 4,
      title: "THE ULTIMATE FACT",
      fact: "99% 5-year survival rate with EARLY detection.",
      details: "Your life is worth identifying skin cancer early.",
      badgeColor: "bg-[#22c55e]", // Green
      factColor: "text-[#15803d]" // Darker green for the text in this box
    },
  ];

  return (
    <section className="bg-slate-50 py-20 px-4 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="text-[#0c2b5e] text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            AI Dermatologist can save your life
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            One of the most dangerous diseases that AI Dermatologist can help identify is skin cancer. Skin cancer is the most common cancer in the United States and worldwide.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cancerStats.map((stat) => (
            /* Snake Border Animation Wrapper */
            <div 
              key={stat.id} 
              className="relative p-[3px] rounded-3xl overflow-hidden group bg-white shadow-xl hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Spinning Gradient Line (The Snake) */}
              <div className="absolute inset-[-150%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg,transparent_0%,transparent_70%,#3b82f6_100%)] group-hover:bg-[conic-gradient(from_90deg,transparent_0%,transparent_50%,#3b82f6_100%)] opacity-70 group-hover:opacity-100" />
              
              {/* Inner White Card (Content) */}
              <div className="relative h-full bg-white rounded-[21px] p-8 flex flex-col z-10">
                {/* Top Colored Badge */}
                <span className={`inline-block px-4 py-1.5 rounded-full text-[11px] font-bold text-white uppercase tracking-wider mb-6 self-start ${stat.badgeColor}`}>
                  {stat.title}
                </span>
                
                {/* Main Fact */}
                <h3 className={`text-[1.35rem] font-semibold leading-snug mb-8 ${stat.factColor ? stat.factColor : "text-[#0c2b5e]"}`}>
                  {stat.fact}
                </h3>
                
                <div className="flex-1"></div>
                
                {/* Bottom Details (separated by a subtle line) */}
                <p className="text-gray-500 text-sm mt-4 border-t border-gray-100 pt-5">
                  {stat.details}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default LifeSavingDataView;