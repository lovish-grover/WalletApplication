import React, { useEffect, useState } from "react";
import axios from "../api/backendAPI";

export default function DocumentPreview({ customerId }) {
  const [previews, setPreviews] = useState({ aadhaar: "", pan: "", passport: "" });

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/customer/custDoc/${customerId}`);
        const data = res.data.data;
        const baseURL = "http://localhost:8080/files";

        setPreviews({
          aadhaar: `${baseURL}?path=${encodeURIComponent(data.aadhaarFilePath)}`,
          pan: `${baseURL}?path=${encodeURIComponent(data.panFilePath)}`,
          passport: `${baseURL}?path=${encodeURIComponent(data.passportFilePath)}`,
        });
      } catch (error) {
        console.error("Error loading document previews:", error);
      }
    };

    fetchDocs();
  }, [customerId]);

  return (
    <div className="flex gap-4 justify-center">
      {previews.aadhaar && <img src={previews.aadhaar} alt="Aadhaar" className="h-48 w-48 object-cover rounded-lg" />}
      {previews.pan && <img src={previews.pan} alt="PAN" className="h-48 w-48 object-cover rounded-lg" />}
      {previews.passport && <img src={previews.passport} alt="Passport" className="h-48 w-48 object-cover rounded-lg" />}
    </div>
  );
}
