import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import SpecificPokemon from './Components/SpecificPokemon/SpecificPokemon';
function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Redirect to='/page/1' />
          </Route>
          <Route exact path='/page/:id'>
            <Home />
          </Route>

          <Route exact path='/pokemon/:id'>
            <SpecificPokemon />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
