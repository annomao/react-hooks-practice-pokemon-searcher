import React,{useState} from "react";
import { v4 as uuid } from 'uuid'
import { Form } from "semantic-ui-react";

function PokemonForm({onAddPokemon}) {
  const [newPokemon ,setNewPokemon] = useState({
    name:"",
    hp:"",
    frontUrl:"",
    backUrl:""
  })

  function handleInput(event){
    setNewPokemon({
      ...newPokemon,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event){
    event.preventDefault()
    const formData = {
      id: uuid(),
      name: newPokemon.name,
      hp: parseInt(newPokemon.hp),
      sprites: {
        front: newPokemon.frontUrl,
        back: newPokemon.backUrl
    }
  }
  fetch("http://localhost:3001/pokemon",{
    method:"POST",
    headers:{
      "Content-Type":"Application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
  .then(data => onAddPokemon(data))
}
  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <Form
        onSubmit={handleSubmit}
      >
        <Form.Group widths="equal">
          <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={handleInput}/>
          <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={handleInput}/>
          <Form.Input
            fluid
            label="Front Image URL"
            placeholder="url"
            name="frontUrl"
            onChange={handleInput}
          />
          <Form.Input
            fluid
            label="Back Image URL"
            placeholder="url"
            name="backUrl"
            onChange={handleInput} 
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default PokemonForm;
