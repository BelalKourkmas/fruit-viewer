import "./App.css";
import { JarViewer } from "./components/JarViewer";
import { FruitViewer } from "./components/FruitViewer";
import FruitsProvider from "./context/FruitsContext";

function App() {
    // To reduce API calls, grab the fruits once and process with JS to get groups

    return (
        <div className="flex">
            <FruitsProvider>
                <FruitViewer />
            </FruitsProvider>
            <JarViewer />
        </div>
    );
}

export default App;
