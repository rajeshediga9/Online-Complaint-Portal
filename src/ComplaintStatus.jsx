import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ComplaintStatus = () => {
  const { complaintId } = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
     const res = await fetch(`http://localhost:5000/complaints/${complaintId}`);

      if (res.ok) setComplaint(await res.json());
    };
    fetchComplaint();
  }, [complaintId]);

  if (!complaint) return <p>Loading...</p>;

  return (
    <div>
      <h2>Complaint Status</h2>
      <p><strong>ID:</strong> {complaint.id}</p>
      <p><strong>Subject:</strong> {complaint.subject}</p>
      <p><strong>Status:</strong> {complaint.status}</p>
      {complaint.file_name && (
        <p><a href={`http://localhost:5000${complaint.file_name}`} target="_blank" rel="noreferrer">View Attachment</a></p>
      )}
      <h3>Updates</h3>
      <ul>
        {complaint.updates.map((u, i) => (
          <li key={i}>{new Date(u.date).toLocaleString()} - {u.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintStatus;
