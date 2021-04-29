import { Link } from 'react-router-dom';
import './pokemonGrid.css';

function PokemonGrid({ pokemon, typeColors }) {
  return (
    <Link to={`/pokemon/${pokemon.name}`} className='Card'>
      <div className='Card__img'>
        <img src={pokemon.sprites.front_default} alt='' />
      </div>

      <div className='Card__id'>#{pokemon.id}</div>
      <div className='Card__name'>{pokemon.name}</div>
      <div className='Card__types'>
        {pokemon.types.map((type, index) => {
          return (
            <div
              className='Card__type'
              style={{ backgroundColor: `${typeColors[type.type.name]}` }}
              key={index}
            >
              {type.type.name}
            </div>
          );
        })}
      </div>
    </Link>
  );
}

export default PokemonGrid;
