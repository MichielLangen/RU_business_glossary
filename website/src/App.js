import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navigation/navbar";
import Index from "./Components/Onderwijsontwerp/index-component";
import DataVisualisation from "./Components/CDM/cdm";
import Homepage from "./Components/Homepage";
import AdminPanel from "./Components/Admin/admin";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Home" element={<Homepage />} />
        <Route path="/Woordenboek" element={<Index />} />
        <Route path="/CDM" element={<DataVisualisation />} />
        <Route path="/Manage" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;
