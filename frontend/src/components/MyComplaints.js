import React, { useEffect, useState } from "react";
import axios from "axios";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/complaints?user_id=${userId}`)
      .then(res => setComplaints(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  return (
    <div>
      <h2>My Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        complaints.map(c => (
          <div key={c.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <p><strong>ID:</strong> {c.id}</p>
            <p><strong>Type:</strong> {c.type}</p>
            <p><strong>Subject:</strong> {c.subject}</p>
            <p><strong>Status:</strong> {c.status}</p>
            <p><strong>Submitted:</strong> {new Date(c.submitted_date).toLocaleString()}</p>
            <div>
              <h4>Updates</h4>
              {c.updates.map((u, i) => (
                <p key={i}>{u.date}: {u.message}</p>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyComplaints;
