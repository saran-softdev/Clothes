import { Routes, Route, Router } from "react-router-dom";
import Adminpg from "./Components/Pages/Admin";
import Home from "./Components/Pages/Home";
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";
import Men from "./Components/Pages/Men";
import Women from "./Components/Pages/Women";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import Kids from "./Components/Pages/Kids";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/about" element={<About />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/add-update" element={<Adminpg />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
