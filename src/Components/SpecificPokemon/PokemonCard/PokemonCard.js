import 'Components/SpecificPokemon/PokemonCard/pokemonCard.css';

const PokemonCard = ({
  pokemonData,
  pokemonType,
  pokemonEvolution,
  pokemonEvolutionImages,
  pokemonBio,
  typeColors,
  typeIcons,
  handleRedirectEvolution,
}) => {
  return (
    <div className='div-result jumbotron'>
      {pokemonData.map((data) => (
        <div className='container pokemon-main-div' key={data.id}>
          <div className='title-name'>
            <h2 className='pokename'>#{data.id}</h2>
            <h2 className='pokename'>{data.forms[0].name}</h2>
          </div>

          <div className='row'>
            <div className='col'>
              <div className='pokemon-foto'>
                <img
                  src={data.sprites.other['official-artwork'].front_default}
                  alt=''
                  width='250'
                  height='250'
                />
              </div>
            </div>
            <div className='col'>
              <div className={`infos ${pokemonType[0]}`}>
                <div className='poke-types'>
                  <h3>Type: </h3>
                  <div className='types'>
                    {pokemonType.map((type, index) => {
                      return (
                        <h4
                          style={{
                            background: `${typeColors[type]}`,
                          }}
                          className='pokemon-card-abilities--type'
                          key={index}
                        >
                          <span
                            className={`type-icon ${type}`}
                            style={{ display: 'inline-block' }}
                          >
                            <img src={typeIcons[type]} alt='' />
                          </span>
                          <span
                            className='pokemon-card-type'
                            style={{
                              backgroundColor: `${typeColors[type]}`,
                            }}
                            key={index}
                          >
                            {type}
                          </span>
                        </h4>
                      );
                    })}
                  </div>
                </div>
                <div className='poke-extrainfo'>
                  <h4>Height: {data.height / 10}m</h4>
                  <h4>Weight: {data.weight / 10}kg</h4>
                </div>
                <div className='poke-description'>
                  <span>
                    <h3>Bio:</h3>
                    {pokemonBio[0].toUpperCase() +
                      pokemonBio.slice(1).toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className={`evolutions-box ${pokemonType[0]}`}>
                <h1 className='evolutions-box--title'>Evolutions:</h1>
                <div className='evolutions-box-container '>
                  {pokemonEvolutionImages.map((img, index) => {
                    return (
                      <div
                        key={index}
                        className='pokemon-card-evolution'
                        onClick={handleRedirectEvolution}
                      >
                        <img src={img} alt='' width='120' height='120' />

                        <h4 style={{ textTransform: 'capitalize' }}>
                          {pokemonEvolution[index]}
                        </h4>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonCard;
