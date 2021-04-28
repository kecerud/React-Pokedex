import { useState, useEffect } from 'react';
const useFetch = (url, url2) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonType, setPokemonType] = useState(null);
  const [pokemonEvolution, setPokemonEvolution] = useState(null);
  const [pokemonEvolutionImages, setPokemonEvolutionImages] = useState(null);
  const [pokemonBio, setPokemonBio] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [noPokemonFound, setNoPokemonFound] = useState(false);

  useEffect(() => {
    const getPokemon = async function () {
      try {
        setPokemonBio(null);
        setIsPending(true);
        setNoPokemonFound(false);
        //fetching the data of a pokemon that was searched
        const res = await fetch(url);
        if (res.status === 404) setNoPokemonFound(true);
        const data = await res.json();
        // Set all pokemon types to var typeData
        const typeData = data.types.map((slot) => slot.type.name);

        // get evolution chain testing
        const evoRes = await fetch(url2);
        const evoData = await evoRes.json();
        const chainUrl = evoData.evolution_chain.url;

        const chainRes = await fetch(chainUrl);
        const chainData = await chainRes.json();
        const evolutions = [];
        const evolutionsImages = [];
        setPokemonData([data]);
        setIsPending(false);
        setPokemonType(typeData);
        // if the pokemon is eevee it needs different way of accessing his multiple evolutions
        if (chainData.chain.species.name === 'eevee') {
          //eevee itself
          evolutions.push(chainData.chain.species.name);
          //eevee evolutions
          chainData.chain.evolves_to.forEach((item) =>
            evolutions.push(item.species.name)
          );
          //Looping over evolutions array (which contains eevee + all of its evolutions) and adding its image to each evolution
          for (const evo of evolutions) {
            const imgFetch = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${evo}`
            );
            const evoImg = (await imgFetch.json()).sprites.other[
              'official-artwork'
            ].front_default;
            evolutionsImages.push(evoImg);
          }
        } else {
          // getting up to 3 evolutions
          const evo1 = chainData.chain.species?.name;
          const evo2 = chainData.chain?.evolves_to[0]?.species.name;
          const evo3 =
            chainData.chain?.evolves_to[0]?.evolves_to[0]?.species.name;
          // pushing the evolutions names and images
          for (const evo of [evo1, evo2, evo3]) {
            evolutions.push(evo);
            const imgFetch = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${evo}`
            );
            const evoImg = (await imgFetch.json()).sprites.other[
              'official-artwork'
            ].front_default;
            evolutionsImages.push(evoImg);
          }
        }

        // set flavor text (bio) of the pokemon
        const bioText = evoData.flavor_text_entries
          .find((el) => el.language.name === 'en')
          .flavor_text.replaceAll('', ' ');

        //Setting up state
        setPokemonBio(bioText);
        setPokemonEvolutionImages(evolutionsImages);
        setPokemonEvolution(evolutions);
      } catch (error) {
        console.log(error);
      }
    };
    getPokemon();
  }, [url, url2]);
  return {
    pokemonData,
    pokemonType,
    pokemonEvolution,
    pokemonEvolutionImages,
    pokemonBio,
    isPending,
    noPokemonFound,
  };
};

export default useFetch;
