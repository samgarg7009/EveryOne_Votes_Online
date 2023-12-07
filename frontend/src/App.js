import React from "react";
import { Container } from "react-bootstrap";
//import AuthProvider from "./Context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./components/User.jsx"
import Login from "./components/Login";
import Votepage from "./components/Votepage";
import OfficerLogin from "./components/OfficerLogin.jsx";
import AreaVotes from "./components/AreaVotes.jsx";
import Protected from "./components/protected.jsx";
import FinalPage from "./components/SuccesPage.jsx";
const App = () => {
  // const value = localStorage.getItem("isloggedin");
  const officerLogIn = localStorage.getItem("isofficerLoggedin");
  return (
    <>
      <BrowserRouter>
        <Container>
          <div className="w-100">
            <Routes>
              <Route exact path="/" element={<User />} />
              <Route path="/login" element={<Login />} />
              <Route path="/officerlogin" element={<OfficerLogin />} />
              {/* <Route path="/votepage" element={<Protected isLoggedIn = {value}><Votepage /></Protected>} /> */}
              <Route path="/votepage" element={<Votepage />} />
              {/* <Route path="/areavotes" element={<AreaVotes />} /> */}
              <Route path="/areavotes" element={<Protected isLoggedIn = {officerLogIn}><AreaVotes /></Protected>} />
              <Route path="/finalpage" element={<FinalPage />} />
            </Routes>
          </div>
        </Container>
      </BrowserRouter>
    </>
  );
};

export default App;
