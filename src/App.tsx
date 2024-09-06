import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Invest from './components/Invest/Invest';

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/Invest" element={<Invest />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
