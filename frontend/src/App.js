import Navbar from "./components/Navbar";
// import Orb from "./components/Orb";
import {
  BrowserRouter as Router,

} from "react-router-dom";

import IncomeState from "./context/IncomeState";
import Container from "./components/Container";
import Footer from "./components/Footer";



function App() {
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
            <footer>
              <Footer />
            </footer>
          </IncomeState>
        </div>
      </Router>
    </>
  );
}

export default App;