import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import Home from './Home';
import Dashboard from "./Dashboard";
//import Navbar from "./components/Navbar";
import ComplaintsList from "./components/ComplaintsList";
import SubmitComplaint from "./SubmitComplaint";
import ComplaintStatus from "./ComplaintStatus";
import MyComplaints from "./components/MyComplaints";
 
const App = () => {
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
         <Route path="/" element={<SubmitComplaint />} />
        <Route path="/complaint-status/:complaintId" element={<ComplaintStatus />} />
          <Route path="/my-complaints" element={<MyComplaints />} />
         <Route path="/submit" element={<SubmitComplaint />} />
         <Route path="/complaints" element={<ComplaintsList />} />
      </Routes>
    </Router>
  );
}
 
export default App;