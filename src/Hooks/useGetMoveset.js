import { useState, useEffect } from 'react';
const useGetMoveset = (url) => {
  const [movesetList, setMovesetList] = useState(null);
  useEffect(() => {
    const pokemonMoves = async function () {
      try {
        const res = await fetch(url);
        const data = await res.json();
        const allMoves = data.moves;
        console.log(allMoves);
        setMovesetList(allMoves);
      } catch (error) {
        console.error(error);
      }
    };
    pokemonMoves();
  }, [url]);
  return movesetList;
};

export default useGetMoveset;
