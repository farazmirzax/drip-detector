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
    <div 
      {...getRootProps()} 
      className={`p-10 border-4 border-dashed rounded-3xl cursor-pointer transition-all duration-300 text-center
        ${isDragActive ? "border-blue-500 bg-blue-50 scale-105" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"}
      `}
    >
      <input {...getInputProps()} />
      
      {loading ? (
        <div className="animate-pulse text-xl font-bold text-blue-600">
          🔮 Reading the vibes...
        </div>
      ) : (
        <div>
          <p className="text-2xl mb-2">📸</p>
          <p className="text-gray-500 font-medium">
            {isDragActive ? "Drop it like it's hot!" : "Drag & drop an outfit here, or click to select"}
          </p>
        </div>
      )}

      {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
    </div>
  );
}