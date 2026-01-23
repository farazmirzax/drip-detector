import { useState } from 'react';
import DragDrop from './components/DragDrop';
import ResultCard from './components/ResultCard';

function App() {
  const [response, setResponse] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-black selection:text-white">
      
      {/* Header */}
      <header className="p-6 flex justify-between items-center max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-3xl">💧</span>
          <h1 className="text-2xl font-black tracking-tighter">DripDetector</h1>
        </div>
        <a 
          href="https://github.com/farazmirzax/drip-detector" 
          target="_blank" 
          className="text-sm font-medium text-gray-500 hover:text-black"
        >
          GitHub
        </a>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12 flex flex-col items-center">
        
        {/* Hero Text */}
        {!response && (
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Rate My Fit.
            </h2>
            <p className="text-gray-500 text-lg">
              Upload a photo. AI will judge your aesthetic.<br/>
              <span className="text-xs text-gray-400">(Supports: Y2K, Old Money, Streetwear, Goth, Gym)</span>
            </p>
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