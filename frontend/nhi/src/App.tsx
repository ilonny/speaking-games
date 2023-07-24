import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { IntroScreen } from "./pages/intro";
import "./App.css";
import { GameScreen } from "./pages/game";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route index element={<IntroScreen />} />
                <Route path="/game" element={<GameScreen />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
