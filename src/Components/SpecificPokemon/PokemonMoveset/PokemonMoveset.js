import 'Components/SpecificPokemon/PokemonMoveset/pokemonMoveset.css';

const PokemonMoveset = ({
  movesetList,
  moveIcons,
  typeColors,
  handleRedirectBackToPokemon,
}) => {
  return (
    <div className='div-result moveset-jumbotron main'>
      <h1 onClick={handleRedirectBackToPokemon} className='redirect-text'>
        Back to Pokémon
      </h1>
      <div className='pokemon-grid'>
        {movesetList.map((move, index) => {
          return (
            <div className='move-card' key={index}>
              <div className='move-name'>
                <h3>{move.name}</h3>
              </div>

              <div className='move-class'>
                <img src={moveIcons[move.class]} alt='move-type-physical' />
                <h3
                  style={{
                    color: '#fff',
                    background: `${typeColors[move.type]}`,
                    padding: '5px 10px',
                    borderRadius: '5px',
                  }}
                >
                  {move.type}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonMoveset;
