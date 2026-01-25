import { useState } from 'react';
import DragDrop from './components/DragDrop';
import ResultCard from './components/ResultCard';

function App() {
  const [response, setResponse] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900 font-sans selection:bg-black selection:text-white">
      
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
      </div>
      
      {/* Header */}
      <header className="relative p-6 flex justify-between items-center max-w-4xl mx-auto">
        <div className="flex items-center gap-3 group">
          <span className="text-3xl transform transition-transform group-hover:scale-110 group-hover:rotate-12">💧</span>
          <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            DripDetector
          </h1>
        </div>
        <a 
          href="https://github.com/farazmirzax/drip-detector" 
          target="_blank" 
          className="text-gray-500 hover:text-black transition-all hover:scale-110"
          aria-label="GitHub Repository"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
      </header>

      {/* Main Content */}
      <main className="relative max-w-2xl mx-auto px-6 py-12 flex flex-col items-center">
        
        {/* Hero Text */}
        {!response && (
          <div className="text-center mb-10 animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 leading-tight">
              Rate My Fit.
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              Upload a photo. AI will judge your aesthetic.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {['Y2K', 'Old Money', 'Streetwear', 'Goth', 'Gym'].map((style, i) => (
                <span 
                  key={style} 
                  className="px-3 py-1 bg-white rounded-full text-gray-700 font-medium shadow-sm"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* The Component Switcher */}
        {response ? (
          <ResultCard 
            response={response} 
            reset={() => setResponse(null)} 
          />
        ) : (
          <div className="w-full">
            <DragDrop setResponse={setResponse} />
          </div>
        )}

      </main>
    </div>
  );
}

export default App;