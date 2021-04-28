import 'Components/SpecificPokemon/PokemonMoveset/pokemonMoveset.css';

const PokemonMoveset = ({ handleRedirectBackToPokemon }) => {
  return (
    <div className='div-result jumbotron'>
      <button onClick={handleRedirectBackToPokemon}>Click me</button>
    </div>
  );
};

export default PokemonMoveset;
