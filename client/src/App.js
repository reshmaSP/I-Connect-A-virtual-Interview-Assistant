import { Routes, Route } from "react-router-dom";
import "./App.css";
import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";
import CandidateFeedbackForm from './screens/CandidateFeedbackForm'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LobbyScreen />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/CandidateFeedback" element={<CandidateFeedbackForm />}/>
      </Routes>
    </div>
  );
}

export default App;
