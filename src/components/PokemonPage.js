import React,{useState,useEffect} from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

function PokemonPage() {
  const [pokemons ,setPokemons] = useState([])
  const [search , setSearch] = useState("")

  useEffect(()=>{
    fetch("http://localhost:3001/pokemon")
    .then(res => res.json())
    .then(PokemonData => setPokemons(PokemonData) )
  },[])

  function handleAddPokemon(newPokemon){
    setPokemons([...pokemons,newPokemon])
  }

  const displayPokemons = pokemons.filter((pokemon)=>{
    return pokemon.name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm onAddPokemon={handleAddPokemon}/>
      <br />
      <Search search={search} onsearch={setSearch}/>
      <br />
      <PokemonCollection pokemons={displayPokemons}/>
    </Container>
  );
}

export default PokemonPage;
