import { Routes, Route } from "react-router-dom";
import CustomerLandingPage from "./CustomerLandingPage";
import PermissionPage from "./PermissionPage";
import ConsentPage from "./ConsentPage";
import PreparationPage from "./PreparationPage";
import QueuePage from "./QueuePage";
import VideoCallPage from "./VideoCallPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerLandingPage />} />
      <Route path="/permissions" element={<PermissionPage />} />
      <Route path="/consent" element={<ConsentPage />} />
      <Route path="/preparation" element={<PreparationPage />} />
      <Route path="/queue" element={<QueuePage />} />
      <Route path="/videocall" element={<VideoCallPage />} />
    </Routes>
  );
}

export default App;