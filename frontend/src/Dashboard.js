import React from "react";
import Navbar from "./components/Navbar";
import SubmitComplaint from "./SubmitComplaint"; // ✅ import your page

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <SubmitComplaint /> {/* ✅ render it here */}
      </div>
    </>
  );
};

export default Dashboard;
