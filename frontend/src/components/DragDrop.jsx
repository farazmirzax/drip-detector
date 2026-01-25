import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function DragDrop({ setResponse }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setResponse(null); // Clear previous result

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send to your FastAPI backend
      const res = await axios.post('http://127.0.0.1:8000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse({ ...res.data, image: URL.createObjectURL(file) });
    } catch (err) {
      console.error(err);
      setError("Failed to analyze image. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [setResponse]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {'image/*': []},
    multiple: false
  });

  return (
    <div className="relative">
      <div 
        {...getRootProps()} 
        className={`relative p-12 border-4 border-dashed rounded-3xl cursor-pointer transition-all duration-300 text-center overflow-hidden
          ${isDragActive 
            ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 scale-105 shadow-2xl" 
            : "border-gray-300 hover:border-gray-400 hover:bg-white/50 hover:shadow-xl backdrop-blur-sm bg-white/30"
          }
          ${loading ? "pointer-events-none" : ""}
        `}
      >
        <input {...getInputProps()} />
        
        {loading ? (
          <div className="space-y-4">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            </div>
            <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              🔮 Analyzing your drip...
            </p>
            <p className="text-sm text-gray-500">This might take a few seconds</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-5xl mb-2 transform transition-transform hover:scale-110">
              📸
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700 mb-1">
                {isDragActive ? "Drop it like it's hot! 🔥" : "Upload Your Outfit"}
              </p>
              <p className="text-sm text-gray-500">
                {!isDragActive && "Drag & drop or click to browse"}
              </p>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors">
                Choose File
              </span>
            </div>
          </div>
        )}

        {/* Shimmer effect when dragging */}
        {isDragActive && (
          <div className="absolute inset-0 animate-shimmer pointer-events-none"></div>
        )}
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-sm font-medium flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </p>
        </div>
      )}
    </div>
  );
}