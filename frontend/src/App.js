import Navbar from "./components/Navbar";
import { useState } from "react";
// import Orb from "./components/Orb";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import IncomeState from "./context/IncomeState";
import Container from "./components/Container";



function App() {
  const token = localStorage.getItem("auth-token")
  const [event, setEvent] = useState(token)
  return (
    <>
      <Router>
        <div className="bg-black">
          <IncomeState>
            {/* <Orb/> */}
            <nav className="max-w-[1440px]">
              <Navbar />
            </nav>
            <main className="max-w-[1440px]">
              <Container />
            </main>
          </IncomeState>
        </div>
      </Router>
    </>
  );
}

export default App;