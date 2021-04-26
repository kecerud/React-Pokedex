import React, { useState, useEffect } from 'react';
import PokemonGrid from 'Components/Home/PokemonGrid/PokemonGrid';
import SearchBar from 'Components/SearchBar/SearchBar';
import 'Components/Home/home.css';
import { useHistory, useParams } from 'react-router-dom';
import TYPE_COLORS from 'utils/ColorProvider';

const Home = () => {
  const history = useHistory();
  const { id } = useParams();
  const page = (+id - 1) * 20;
  const [state, setState] = useState({
    pokemonData: [],
    pokemonHelper: null,
    nextUrl: '',
    prevUrl: '',
    loading: true,
  });

  const fetchData = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=20`;
    setState((current) => {
      return {
        ...current,
        loading: true,
      };
    });
    const response = await getAllPokemon(url);
    if (!response) console.log('no response');
    setState((current) => {
      return {
        ...current,
        nextUrl: response.next,
        prevUrl: response.previous,
      };
    });
    await loadPokemon(response.results);
    setState((current) => {
      return {
        ...current,
        loading: false,
      };
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getAllPokemon = async function (url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  };

  const next = () => {
    if (!state.nextUrl) return;
    history.push(`/page/${+id + 1}`);
  };

  const prev = () => {
    if (!state.prevUrl) return;
    history.push(`/page/${+id - 1}`);
  };

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon);

        return pokemonRecord;
      })
    );
    setState((current) => {
      return {
        ...current,
        pokemonData: _pokemonData,
      };
    });
  };

  function getPokemon({ url }) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  }

  const handleChange = (e) => {
    setState((current) => {
      return {
        ...current,
        pokemonHelper: e.target.value.toLowerCase(),
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/pokemon/${state.pokemonHelper}`);
    e.target.reset();
  };

  const renderPokemon = (data) => {
    return data.map((pokemon) => {
      return (
        <PokemonGrid
          typeColors={TYPE_COLORS}
          key={pokemon.id}
          pokemon={pokemon}
        />
      );
    });
  };
  return (
    <div className='main'>
      <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
      {state.loading && <div className='loader'></div>}

      {!state.loading && (
        <div className='grid-container'>{renderPokemon(state.pokemonData)}</div>
      )}
      {!state.loading && (
        <div className='pagination--btn'>
          <button onClick={prev}>Prev</button>
          <button onClick={next}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Home;
