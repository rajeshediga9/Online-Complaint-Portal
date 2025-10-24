import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ComplaintsList.css"; // create this CSS file for styling

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    // Fetch complaints for this user
    axios
      .get(`http://localhost:5000/complaints?user_id=${user.id}`)
      .then((res) => setComplaints(res.data))
      .catch((err) => console.error("Failed to fetch complaints:", err));
  }, [user, navigate]);

  return (
    <div className="complaints-container">
      <h2>📄 My Complaints</h2>

      {complaints.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        complaints.map((c) => (
          <div key={c.id} className="complaint-card">
            <h3>{c.subject}</h3>
            <p>{c.description}</p>
            <p><strong>Status:</strong> {c.status}</p>
            {c.file_name && (
              <p>
                <strong>Attachment:</strong>{" "}
                <a href={`http://localhost:5000${c.file_name}`} target="_blank" rel="noreferrer">
                  View File
                </a>
              </p>
            )}

            {c.updates && c.updates.length > 0 && (
              <div className="timeline">
                <h4>Timeline / Updates</h4>
                {c.updates.map((u, index) => (
                  <div key={index} className="update-card">
                    <strong>{u.date}:</strong> {u.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ComplaintsList;
