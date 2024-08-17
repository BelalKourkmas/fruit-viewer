import "./App.css";
import { JarViewer } from "./components/JarViewer";
import { FruitViewer } from "./components/FruitViewer";
import { useState, useEffect } from "react";
import { useFruits } from "./hooks/useFruits";

function App() {
    // To reduce API calls, grab the fruits once and process with JS to get groups
    const fruits = useFruits();
    console.log(fruits);
    return (
        <div className="flex">
            <FruitViewer />
            <JarViewer />
        </div>
    );
}

export default App;
