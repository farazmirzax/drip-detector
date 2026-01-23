import React from 'react';

export default function ResultCard({ response, reset }) {
  if (!response) return null;

  const { style, confidence, raw_scores, image } = response;

  // Helper to color-code the vibes
  const getColor = (s) => {
    const colors = {
      goth: "text-purple-600 bg-purple-100",
      streetwear: "text-orange-600 bg-orange-100",
      old_money: "text-emerald-600 bg-emerald-100",
      y2k: "text-pink-600 bg-pink-100",
      gym_rat: "text-blue-600 bg-blue-100",
    };
    return colors[s] || "text-gray-600 bg-gray-100";
  };

  return (
    <div className="mt-8 w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-fade-in-up">
      {/* Top Image Preview */}
      <div className="relative h-64 w-full bg-gray-100">
        <img 
          src={image} 
          alt="Uploaded fit" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-white text-3xl font-bold capitalize">{style}</h2>
          <p className="text-gray-200 font-mono text-sm">Confidence: {confidence}</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-6">
        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">Detailed Breakdown</h3>
        
        <div className="space-y-3">
          {Object.entries(raw_scores).map(([key, score]) => (
            <div key={key} className="flex items-center justify-between">
              <span className={`capitalize px-2 py-1 rounded-md text-xs font-bold ${key === style ? getColor(key) : "text-gray-500"}`}>
                {key.replace("_", " ")}
              </span>
              <div className="flex-1 mx-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${key === style ? "bg-black" : "bg-gray-300"}`}
                  style={{ width: score }}
                ></div>
              </div>
              <span className="text-xs font-mono text-gray-500">{score}</span>
            </div>
          ))}
        </div>

        {/* Try Again Button */}
        <button 
          onClick={reset}
          className="mt-6 w-full py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-transform active:scale-95"
        >
          Analyze Another Fit 🔄
        </button>
      </div>
    </div>
  );
}