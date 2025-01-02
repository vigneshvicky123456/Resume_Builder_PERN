import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import TopNavbar from "./Components/Navbar/TopNavbar";
import Sign_In_Page from "./Components/Login/Sign_In_Page";
import Sign_Up_Page from "./Components/Login/Sign_Up_Page";
import ProtectedRoute from "./Components/Login/ProtectedRoute";
import Resume from "./Pages/Resume";
import SideNavbar from "./Components/Navbar/SideNavbar";
import Contact from "./Components/Contact/Contact";
import Experience from "./Components/Experience/Experience";
import Education from "./Components/Education/Education";
import EducationForm from "./Components/Education/EducationForm";
import Certifications from "./Components/Certifications/Certifications";
import Skills from "./Components/Skills/Skills";
import Summary from "./Components/Summary/Summary";
import References from "./Components/References/References";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/sign-up" element={<Sign_Up_Page />} />
          <Route path="/sign-in" element={<Sign_In_Page />} />
          
          <Route path="/" element={<TopNavbar />} >
            <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />

            <Route path="/resume" element={<SideNavbar />} >
              <Route path="/resume" element={<Resume />} />
              <Route index element={<Contact />} />
              <Route path='experience' element={<Experience />} />
              <Route path='education' element={<Education />} />
              <Route path='certifications' element={<Certifications />} />
              <Route path='skills' element={<Skills />} />
              <Route path='summary' element={<Summary />} />
              <Route path='references' element={<References />} />
            </Route>

            <Route path="/educationForm" element={<EducationForm />} />
            
          </Route>
          
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
