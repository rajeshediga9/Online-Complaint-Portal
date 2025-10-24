import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SubmitComplaint.css";

const SubmitComplaint = () => {
  const [submissionType, setSubmissionType] = useState("Public");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")); // logged-in user

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert("User not logged in!");
      return;
    }

    setLoading(true);

    const complaintId = "CMP-" + Math.floor(Math.random() * 100000);

    // Build form data for file + complaint info
    const formData = new FormData();
    formData.append("user_id", user.id); // <-- important!
    formData.append("id", complaintId);
    formData.append("type", submissionType);
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append(
      "submittedDate",
      new Date().toISOString().slice(0, 19).replace("T", " ")
    );
    formData.append("status", "Under Review");
    formData.append(
      "updates",
      JSON.stringify([
        {
          date: new Date().toLocaleString(),
          message: "Complaint successfully submitted and is awaiting review.",
        },
      ])
    );
    if (file) formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/complaints", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Complaint stored:", res.data);

      // Navigate to status page after successful DB insert
 navigate(`/complaint-status/${complaintId}`);


      // Reset form
      setSubject("");
      setDescription("");
      setFile(null);
      setSubmissionType("Public");
    } catch (err) {
      console.error("❌ Failed to submit complaint:", err);
      alert("Failed to submit complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-complaint-container">
      <div className="top-row">
        <button type="button" className="back-icon" aria-label="back">
          ←
        </button>
        <h2 className="title">Submit Complaint</h2>
      </div>

      <form onSubmit={handleSubmit} className="complaint-form">
        {/* Submission Type */}
        <div className="section submission-section">
          <label className="section-label">Submission Type</label>
          <div className="submission-type">
            <button
              type="button"
              className={submissionType === "Public" ? "pill active" : "pill"}
              onClick={() => setSubmissionType("Public")}
            >
              Public
            </button>
            <button
              type="button"
              className={submissionType === "Anonymous" ? "pill active" : "pill"}
              onClick={() => setSubmissionType("Anonymous")}
            >
              Anonymous
            </button>
          </div>
        </div>

        {/* Complaint Details */}
        <div className="section">
          <label className="section-label">Complaint Details</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            required
            className="input-field"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="textarea-field"
          />
        </div>

        {/* Attachments */}
        <div className="section">
          <label className="section-label">Attachments (Optional)</label>
          <div className="upload-box">
            <div className="upload-content">
              <p className="upload-title">Add Media</p>
              <p className="upload-sub">
                Attach images or videos to support your complaint.
              </p>

              <label className="upload-btn">
                Upload
                <input type="file" onChange={handleFileChange} hidden />
              </label>

              {file && <p className="file-name">{file.name}</p>}
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
};

export default SubmitComplaint;
