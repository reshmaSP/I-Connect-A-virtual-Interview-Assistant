import { Routes, Route } from "react-router-dom";
import "./App.css";
import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";
import LandingPage from "./screens/LandingPage";
import NavigBar from "./components/NavigBar";
import RegisterForm from "./components/RegisterForm";
import UserRegister from "./components/UserRegister";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavigBar/>}/>
        <Route path="/login" element={<LandingPage/>}/>
        <Route path="/lobby" element={<LobbyScreen />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/register" element={<UserRegister user="1"/>} />
      </Routes>
    </div>
  );
}

export default App;
