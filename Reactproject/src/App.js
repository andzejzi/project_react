import { Routes, Route } from "react-router-dom";
import Error from "./pages/Error/Error";
import Register from "./pages/Register/Register";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} exact />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
