import React from 'react';

export default function ResultCard({ response, reset }) {
  if (!response) return null;

  const { style, confidence, raw_scores, image } = response;

  // Helper to color-code the vibes
  const getColor = (s) => {
    const colors = {
      goth: "text-purple-700 bg-gradient-to-r from-purple-100 to-purple-200",
      streetwear: "text-orange-700 bg-gradient-to-r from-orange-100 to-orange-200",
      old_money: "text-emerald-700 bg-gradient-to-r from-emerald-100 to-emerald-200",
      y2k: "text-pink-700 bg-gradient-to-r from-pink-100 to-pink-200",
      gym_rat: "text-blue-700 bg-gradient-to-r from-blue-100 to-blue-200",
    };
    return colors[s] || "text-gray-600 bg-gray-100";
  };

  const getEmoji = (s) => {
    const emojis = {
      goth: "🖤",
      streetwear: "👟",
      old_money: "🎩",
      y2k: "✨",
      gym_rat: "💪",
    };
    return emojis[s] || "👔";
  };

  return (
    <div className="mt-8 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 animate-fade-in-up">
      {/* Top Image Preview */}
      <div className="relative h-80 w-full bg-gray-100 overflow-hidden group">
        <img 
          src={image} 
          alt="Uploaded fit" 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{getEmoji(style)}</span>
            <div>
              <h2 className="text-white text-3xl font-black capitalize tracking-tight">
                {style.replace('_', ' ')}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-2 w-24 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: confidence }}
                  ></div>
                </div>
                <span className="text-white font-bold text-sm">{confidence}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
            <span>📊</span>
            <span>Style Breakdown</span>
          </h3>
          
          <div className="space-y-3">
            {Object.entries(raw_scores)
              .sort(([, a], [, b]) => parseFloat(b) - parseFloat(a))
              .map(([key, score], index) => {
                const isWinner = key === style;
                return (
                  <div 
                    key={key} 
                    className="group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getEmoji(key)}</span>
                        <span className={`capitalize text-sm font-bold ${isWinner ? getColor(key) : "text-gray-600"} px-3 py-1 rounded-full`}>
                          {key.replace("_", " ")}
                        </span>
                      </div>
                      <span className={`text-sm font-mono font-bold ${isWinner ? "text-black" : "text-gray-500"}`}>
                        {score}
                      </span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          isWinner 
                            ? "bg-gradient-to-r from-black via-gray-700 to-black" 
                            : "bg-gray-300"
                        }`}
                        style={{ 
                          width: score,
                          transitionDelay: `${index * 100}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button 
            onClick={reset}
            className="w-full py-3.5 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Analyze Another Fit</span>
            <span>🔄</span>
          </button>
          <button 
            onClick={() => {
              const link = document.createElement('a');
              link.href = image;
              link.download = `drip-${style}.jpg`;
              link.click();
            }}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Download Result</span>
            <span>⬇️</span>
          </button>
        </div>
      </div>
    </div>
  );
}