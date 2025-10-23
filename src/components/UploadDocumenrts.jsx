import React, { useState, useEffect } from "react";
import axios from "../api/backendAPI";
import { Trash2, Download } from "lucide-react";

function UploadDocuments() {
  const [aadhaarImage, setAadhaarImage] = useState();
  const [panImage, setPanImage] = useState();
  const [passportImage, setPassportImage] = useState();
  const [preview, setPreview] = useState({
    aadhaar: null,
    pan: null,
    passport: null,
  });
  const [existingDocs, setExistingDocs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState({
    aadhaar: false,
    pan: false,
    passport: false,
  });
  const [verifying, setVerifying] = useState({
    aadhaar: false,
    pan: false,
    passport: false,
  });
  const [deleting, setDeleting] = useState({
    aadhaar: false,
    pan: false,
    passport: false,
  });

  useEffect(() => {
    const fetchExistingDocs = async () => {
      const customerId = localStorage.getItem("custId");
      try {
        const res = await axios.get(`/customer/custDoc/${customerId}`);
        if (res.data.data) {
          const { aadhaarFilePath, panFilePath, passportFilePath } =
            res.data.data;
          setPreview({
            aadhaar: `http://localhost:8080/customer/files?path=${encodeURIComponent(
              aadhaarFilePath
            )}`,
            pan: `http://localhost:8080/customer/files?path=${encodeURIComponent(
              panFilePath
            )}`,
            passport: `http://localhost:8080/customer/files?path=${encodeURIComponent(
              passportFilePath
            )}`,
          });
          setExistingDocs(true);
        }
      } catch {
        console.log("No existing documents found");
      }
    };
    fetchExistingDocs();
  }, []);

  const handleFileChange = async (e, type) => {
    const selecFile = e.target.files[0];
    if (!selecFile) return;

    if (!selecFile.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }
    if (selecFile.size > 5 * 1024 * 1024) {
      alert("File too large (max 5MB)");
      return;
    }

    const previewUrl = URL.createObjectURL(selecFile);
    setPreview((prev) => ({ ...prev, [type]: previewUrl }));

    if (type === "aadhaar") setAadhaarImage(selecFile);
    if (type === "pan") setPanImage(selecFile);
    if (type === "passport") setPassportImage(selecFile);

    if (type === "aadhaar") {
      await verifyAadhaar(selecFile);
    } else {
      setVerified((prev) => ({ ...prev, [type]: true }));
    }
  };

  const verifyAadhaar = async (file) => {
    setVerifying((prev) => ({ ...prev, aadhaar: true }));
    try {
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

      if (data.detected && data.detections.length > 0) {
        alert(
          `aadhaar card detected confidence: ${(
            data.detections[0].confidence * 100
          ).toFixed(1)}%`
        );
        setVerified((prev) => ({ ...prev, aadhaar: true }));
      } else {
        alert(
          "invalid aadhaar card. please upload a valid aadhaar card image."
        );
        setVerified((prev) => ({ ...prev, aadhaar: false }));
        setPreview((prev) => ({ ...prev, aadhaar: null }));
        setAadhaarImage(null);
      }
    } catch (err) {
      console.error("aadhaar verification error:", err);
      alert(`verification failed: ${err.message}`);
      setVerified((prev) => ({ ...prev, aadhaar: false }));
      setPreview((prev) => ({ ...prev, aadhaar: null }));
      setAadhaarImage(null);
    } finally {
      setVerifying((prev) => ({ ...prev, aadhaar: false }));
    }
  };

  const handleDelete = async (type) => {
    if (
      !window.confirm(
        `are you sure you want to delete this ${type.toUpperCase()} document?`
      )
    ) {
      return;
    }

    setDeleting((prev) => ({ ...prev, [type]: true }));
    try {
      const customerId = localStorage.getItem("custId");
      const response = await axios.delete(
        `/customer/custDoc/${customerId}/${type.toLowerCase()}`
      );
      if (response.data.success || response.status === 200) {
        alert(`${type.toUpperCase()} document deleted successfully!`);
        setPreview((prev) => ({ ...prev, [type]: null }));
        setExistingDocs(false);
      }
    } catch (error) {
      console.error("delete failed:", error);
      alert(
        `failed to delete ${type.toUpperCase()} document. Please try again.`
      );
    } finally {
      setDeleting((prev) => ({ ...prev, [type]: false }));
    }
  };
  const handleSubmit = async () => {
    if (!aadhaarImage || !panImage || !passportImage) {
      alert("Please upload all 3 documents");
      return;
    }

    if (!verified.aadhaar) {
      alert("Please verify Aadhaar card before uploading.");
      return;
    }

    if (!verified.pan || !verified.passport) {
      alert("Please upload all documents (PAN and Passport)");
      return;
    }

    const formData = new FormData();
    formData.append("customerId", localStorage.getItem("custId"));
    formData.append("aadhaarFile", aadhaarImage);
    formData.append("panFile", panImage);
    formData.append("passportFile", passportImage);

    try {
      setLoading(true);
      const response = await axios.post("/customer/custDoc", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Uploaded successfully");
      console.log(response.data);
      setExistingDocs(true);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderUploadBox = (id, title, type) => (
    <div className="flex flex-col items-center justify-center w-1/3 m-2">
      <label
        htmlFor={id}
        className={`flex flex-col items-center justify-center h-64 w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 overflow-hidden transition ${
          existingDocs ? "cursor-not-allowed opacity-80" : ""
        }`}
      >
        <h1 className="text-gray-800 dark:text-white text-2xl mb-2">{title}</h1>

        {preview[type] ? (
          <img
            src={preview[type]}
            alt={`${title} Preview`}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021A4 4 0 0 0 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
          </div>
        )}
        <input
          id={id}
          type="file"
          className="hidden"
          accept="image/*"
          disabled={existingDocs}
          onChange={(e) => handleFileChange(e, type)}
        />
      </label>

      {existingDocs && preview[type] && (
        <div className="flex gap-2 mt-3">
          <a
            href={preview[type]}
            download={`${title}.jpg`}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            <Download size={18} />
            Download
          </a>
          <button
            onClick={() => handleDelete(type)}
            disabled={deleting[type]}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:bg-gray-400"
          >
            <Trash2 size={18} />
            {deleting[type] ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-black text-5xl m-4 font-semibold">
        Upload Your Documents!!
      </h1>

      {loading && <p className="text-blue-600 mb-3">Uploading...</p>}

      <div className="flex justify-between w-full px-5">
        {renderUploadBox("aadhaar-file", "Aadhaar", "aadhaar")}
        {renderUploadBox("pan-file", "PAN", "pan")}
        {renderUploadBox("passport-file", "Passport", "passport")}
      </div>

      {!existingDocs && (
        <button
          onClick={handleSubmit}
          disabled={loading || !verified.aadhaar}
          className={`mt-5 px-6 py-2 rounded-lg transition-all ${
            loading || !verified.aadhaar
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Upload"}
        </button>
      )}
    </div>
  );
}

export default UploadDocuments;
