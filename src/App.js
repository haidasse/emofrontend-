// import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Connexion from "../src/Components/Connexion";
import Admin from "../src/Components/Admin";
import Test from "../src/Components/test";
import Appell from "./Components/historique";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Connexion/>}/>
          <Route path="/test" element={<Test/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/historique" element={<Appell/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;