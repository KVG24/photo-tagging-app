import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Game from "./components/Game";
import Leaderboards from "./components/Leaderboards";

function App() {
    const [mode, setMode] = useState("wally");
    const [timerMode, setTimerMode] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Welcome
                            setMode={setMode}
                            setTimerMode={setTimerMode}
                        />
                    }
                />
                <Route
                    path="game"
                    element={<Game mode={mode} timerMode={timerMode} />}
                />
                <Route path="leaderboards" element={<Leaderboards />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
