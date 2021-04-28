import { useState } from 'react';
import PokemonCard from 'Components/SpecificPokemon/PokemonCard/PokemonCard';
import SearchBar from 'Components/SearchBar/SearchBar';
import PokemonMoveset from 'Components/SpecificPokemon/PokemonMoveset/PokemonMoveset';
import useFetch from 'Hooks/useFetch';
import useGetMoveset from 'Hooks/useGetMoveset';
import { useParams } from 'react-router';
import 'Styles/iconStyles.css';
import TYPE_COLORS from 'utils/ColorProvider';
import TYPE_ICONS from 'utils/IconProvider';
const SpecificPokemon = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(id);
  const [pokemonHelper, setPokemonHelper] = useState(null);
  const [pokemonMoves, setpokemonMoves] = useState(null);
  const {
    pokemonData,
    pokemonType,
    pokemonEvolution,
    pokemonEvolutionImages,
    pokemonBio,
    isPending,
    noPokemonFound,
  } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
    `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`
  );
  const movesetList = useGetMoveset(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  const handleChange = (e) => {
    setPokemonHelper(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemon(pokemonHelper);
    window.history.replaceState(null, ``, `/pokemon/${pokemonHelper}`);
    e.target.reset();
  };

  const handleRedirectEvolution = (e) => {
    e.preventDefault();
    const pokemonEvo = e.target.parentNode.querySelector('h4').innerHTML;
    if (pokemon === pokemonEvo) return;
    setPokemon(pokemonEvo.toLowerCase());
    window.history.replaceState(null, ``, `/pokemon/${pokemonEvo}`);
  };
  const handleRedirectMoveset = (e) => {
    e.preventDefault();
    setpokemonMoves(pokemon);
  };

  const handleRedirectBackToPokemon = (e) => {
    e.preventDefault();
    setpokemonMoves(null);
  };
  return (
    <div className='main'>
      {!pokemonMoves && (
        <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
      )}
      {noPokemonFound && (
        <div>No such pokemon exists! Try searching again.. </div>
      )}
      {isPending && !noPokemonFound && <div className='loader'></div>}
      {pokemonMoves && (
        <PokemonMoveset
          movesetList={movesetList}
          handleRedirectBackToPokemon={handleRedirectBackToPokemon}
        />
      )}
      {!isPending && pokemonEvolution && pokemonBio && !pokemonMoves && (
        <PokemonCard
          pokemonData={pokemonData}
          pokemonType={pokemonType}
          pokemonEvolution={pokemonEvolution}
          pokemonEvolutionImages={pokemonEvolutionImages}
          pokemonBio={pokemonBio}
          typeColors={TYPE_COLORS}
          typeIcons={TYPE_ICONS}
          handleRedirectEvolution={handleRedirectEvolution}
          handleRedirectMoveset={handleRedirectMoveset}
        />
      )}
    </div>
  );
};

export default SpecificPokemon;
