import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Game from "./components/Game";
import Leaderboards from "./components/Leaderboards";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="game" element={<Game />} />
                <Route path="leaderboards" element={<Leaderboards />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
