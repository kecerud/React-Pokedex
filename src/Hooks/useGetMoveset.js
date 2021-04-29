import { useState, useEffect } from 'react';
const useGetMoveset = (url) => {
  const [movesetList, setMovesetList] = useState(null);
  useEffect(() => {
    const pokemonMoves = async function () {
      try {
        setMovesetList(null);
        const res = await fetch(url);
        const data = await res.json();

        //text fetching all of its moves and putting into objects of array
        const allMovesArr = [];
        const allMoves = data.moves.filter((move) => {
          return move.version_group_details[0].move_learn_method.name.includes(
            'level-up'
          );
        });

        for (const { move } of allMoves) {
          //0
          const url = move.url;
          const resUrl = await fetch(url);
          const dataUrl = await resUrl.json();
          const moveClass2 = dataUrl.damage_class.name;
          const moveType2 = dataUrl.type.name;
          allMovesArr.push({
            name: move.name,
            class: moveClass2,
            type: moveType2,
          });
        }
        console.log(allMovesArr);
        setMovesetList(allMovesArr);
        // const detailsMoves
      } catch (error) {
        console.error(error);
      }
    };
    pokemonMoves();
  }, [url]);
  return movesetList;
};

export default useGetMoveset;
