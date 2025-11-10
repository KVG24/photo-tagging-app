import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Game from "./components/Game";
import Leaderboards from "./components/Leaderboards";

function App() {
    const [mode, setMode] = useState("wally");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome setMode={setMode} />} />
                <Route path="game" element={<Game mode={mode} />} />
                <Route path="leaderboards" element={<Leaderboards />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
