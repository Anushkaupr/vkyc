import { Routes, Route } from "react-router-dom";

import PermissionPage from "./PermissionPage";
import ConsentPage from "./ConsentPage";
import PreparationPage from "./PreparationPage";
import QueuePage from "./QueuePage";
import VideoCallPage from "./VideoCallPage";
import AdministrationPage from "./AdministrationPage" ;
import CustomerLandingPage from "./CustomerLandingPage";
import DashboardPage from "./DashboardPage";
import InstantSessionPage from "./InstantSessionPage";
import LoginPage from "./LoginPage";
import ReportPage from "./ReportPage";
import SessionPage from "./SessionPage";
import AppointmentCalendarPage from "./AppointmentCalendarPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerLandingPage />} />
      <Route path="/permissions" element={<PermissionPage />} />
      <Route path="/consent" element={<ConsentPage />} />
      <Route path="/preparation" element={<PreparationPage />} />
      <Route path="/queue" element={<QueuePage />} />
      <Route path="/videocall" element={<VideoCallPage />} />
      <Route path ="/administration" element={<AdministrationPage/>} />
      <Route path ="/workflow" element={<CustomerLandingPage/>} />
      <Route path ="/dashboard" element={<DashboardPage/>} />
      <Route path ="/instantsession" element={<InstantSessionPage/>} />
      <Route path ="/login" element={<LoginPage/>} />
      <Route path ="/report" element={<ReportPage/>} />
      <Route path ="/session" element={<SessionPage/>} />
      <Route path ="/appointments" element={<AppointmentCalendarPage/>} />

    </Routes>
  );
}

export default App;