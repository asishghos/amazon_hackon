import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WatchPartyPlatform from "./Components/s2.jsx";
import MXPlayerUI from "./Components/s1.jsx";
import FireTVDemo from "./Components/s3.jsx";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MXPlayerUI />} />
        <Route path="/watchParty" element={<WatchPartyPlatform />} />
        <Route path="/aiFeatures" element={<FireTVDemo />} />
      </Routes>
    </Router>
  );
}

export default App;