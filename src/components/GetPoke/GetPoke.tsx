import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface IPokemon {
  name: string;
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

const Pokemon: React.FC = () => {
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<IPokemon>('https://pokeapi.co/api/v2/pokemon/ditto');
      setPokemon(response.data);
    };

    fetchData();
  }, []);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <h2>Abilities:</h2>
      <ul>
        {pokemon.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
      <h2>Stats:</h2>
      <ul>
        {pokemon.stats.map((stat, index) => (
          <li key={index}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pokemon;
