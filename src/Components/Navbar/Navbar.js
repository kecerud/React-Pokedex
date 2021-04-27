import { Link } from 'react-router-dom';
import 'Components/Navbar/navbar.css';
const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/page/1'>
        <h1>Pokédex</h1>
      </Link>

      <div className='links'>
        <a href='https://github.com/kecerud/React-Pokedex'>Github</a>
      </div>
    </nav>
  );
};

export default Navbar;
