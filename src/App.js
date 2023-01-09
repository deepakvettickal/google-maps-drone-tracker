import { Routes, Route, useNavigate } from "react-router-dom";
import Home  from "./Home.js";
import Login  from "./Login.js";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";





const App = ()=> {
  const [auth, setAuth] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login setAuth={setAuth}/>} />
    </Routes>
  );
}

export default App;

