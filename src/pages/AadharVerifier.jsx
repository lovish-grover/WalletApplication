import React, { useState, useEffect } from "react";
import * as ort from "onnxruntime-web";

function AadhaarVerifier() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Configure ONNX Runtime to use CPU backend only (more reliable)
    ort.env.wasm.numThreads = 1;
    ort.env.wasm.wasmPaths = "/";
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError(null);
    setResults(null);

    // Preview image
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => setPreview(event.target.result);
      reader.readAsDataURL(selectedFile);
    }
  };



  const verifyAadhaar = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Send to Python backend for inference
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8088/verify", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(`Verification failed: ${err.message}`);
      console.error("Verification error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">Aadhaar Verification</h1>
          <p className="text-gray-600 mb-6">Upload an Aadhaar card image for verification</p>

          <div className="space-y-6">
            {/* File Upload */}
            <div className="border-3 border-dashed border-blue-300 rounded-lg p-8 bg-blue-50 hover:bg-blue-100 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full cursor-pointer"
                disabled={loading}
              />
              {file && (
                <p className="text-sm text-blue-600 mt-3 font-semibold">
                  📁 {file.name}
                </p>
              )}
            </div>

            {/* Image Preview */}
            {preview && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">Preview:</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-80 object-contain rounded-lg border border-gray-300"
                />
              </div>
            )}

            {/* Verify Button */}
            <button
              onClick={verifyAadhaar}
              disabled={!file || loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? "🔄 Verifying..." : "✓ Verify Aadhaar"}
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700 font-semibold">Error:</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Results */}
            {results && (
              <div
                className={`rounded-lg p-6 ${
                  results.detected
                    ? "bg-green-50 border-l-4 border-green-500"
                    : "bg-yellow-50 border-l-4 border-yellow-500"
                }`}
              >
                <p
                  className={`font-bold text-lg mb-4 ${
                    results.detected ? "text-green-700" : "text-yellow-700"
                  }`}
                >
                  {results.message}
                </p>

                {results.detections.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-700">
                      Detections:
                    </p>
                    {results.detections.map((det, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-3 rounded border border-gray-200"
                      >
                        <p className="text-sm">
                          <span className="font-semibold">Card {idx + 1}:</span>{" "}
                          {det.label}
                        </p>
                        <p className="text-sm text-gray-600">
                          Confidence: {(det.confidence * 100).toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Bbox: [{det.bbox.map((v) => v.toFixed(0)).join(", ")}]
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AadhaarVerifier;