import { Routes, Route } from "react-router-dom";
import Register from "./Auth/Register/page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Auth/Register" element={<Register />} />
    </Routes>
  );
}