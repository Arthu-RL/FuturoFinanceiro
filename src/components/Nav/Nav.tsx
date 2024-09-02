import { Link } from 'react-router-dom';
import "./Nav.css"

function Nav() {
  return (
    <nav className='nav'>
      <ul className='nav-list'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Invest">Invest</Link></li>
        <li><p>Saldo: var</p></li>
      </ul>
    </nav>
  );
}

export default Nav;