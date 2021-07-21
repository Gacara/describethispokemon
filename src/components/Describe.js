import React, { useState, useContext } from "react";
import firebase from "../utils/firebaseConfig";
import { UidContext } from "./UidContext";
import { Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';
import data from "./data.json";

/*
interface PokemonsDescriptionsInterface {
  pokemonsDescriptions: PokemonDescriptionInterface[];
}

interface PokemonsDescriptionsInterface {
  id: String;
  name: String;
  img: String;
  [String: Any]: any;
}

*/
// {key: value}
const Create = () => {
  const {pokemons} = data;
  const [rIndex, setRindex] = useState(randomNumberInsidePokemonsList())
  const defaultForm = [{id: "1", key: "", value: ""}];
  const [pokemonsDescriptions, setPokemonsDescriptions] = useState(defaultForm);

  const uid = useContext(UidContext);

  function randomNumberInsidePokemonsList(){
    return Math.floor(Math.random() * pokemons.length);
  }

  function onAddClick(){
    setPokemonsDescriptions([...pokemonsDescriptions, {
      id: `${pokemonsDescriptions.length + 1}`,
      key: "",
      value: "",
    }])
  }

  function removeRow(selectedIndex){
    const newDescriptionWithoutSelectedRow = pokemonsDescriptions.filter((_value, index) => index !== selectedIndex);
    setPokemonsDescriptions(newDescriptionWithoutSelectedRow);
  }

  function createDescription() {
    const DescriptionsDB = firebase.database().ref(`descriptionsDB/${uid}/${pokemons[rIndex].name}`);

    let newDescription = {};
    pokemonsDescriptions.forEach((description) => {
      if (description.key !== "" && description.value !== ""){
        newDescription = {...newDescription,
          [description.key]: description.value,
        }
      }
    })
    DescriptionsDB.set(newDescription);

    setPokemonsDescriptions(defaultForm);
    setRindex(randomNumberInsidePokemonsList());
  };

function updateKey(value, index) {
  const newPokemonsDescriptions = [...pokemonsDescriptions];
  newPokemonsDescriptions[index].key = value;
  setPokemonsDescriptions(newPokemonsDescriptions);
}

function updateValue(value, index) {
  const newPokemonsDescriptions = [...pokemonsDescriptions];
  newPokemonsDescriptions[index].value = value;
  setPokemonsDescriptions(newPokemonsDescriptions);
}

  function createNewPokemonDescriptionLine(description, index){
    const {key, value} = description;

    return (<div key={index} style={{paddingBottom: "12px"}}>
        <input
          type="text"
          placeholder="Type de Description"
          value={key}
          onChange={(e) => updateKey(e.target.value, index)}
        />
        <input
          style={{marginLeft: "15px"}}
          type="text"
          placeholder="Valeur"
          value={value}
          onChange={(e) => updateValue(e.target.value, index)}
        />
        <a style={{ cursor: "pointer", color: "red", paddingLeft: "15px"}} onClick={() => removeRow(index)}>
          <b>X</b>
        </a>

      </div>);
  }
  return (
    <div>
      <div style={{display: "flex", alignItems: "center", paddingBottom: "24px"}}>
        <h4 style={{paddingRight: "20px", margin: 0}}>Décrivez ce pokémon</h4>
        <Button style={{display: "flex" }}variant="contained" size="small" color="primary" onClick={() => setRindex(randomNumberInsidePokemonsList())}>Reload</Button>
      </div>
    
    <Card>
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        {pokemons[rIndex].name}
      </Typography>
      </CardContent>
      <CardMedia
        style={{height: "120px", backgroundSize: "auto", paddingBottom: "20px"}}
        image={pokemons[rIndex].img}
        title={pokemons[rIndex].name}
      >
      </CardMedia>
    </Card>
    <div style={{paddingTop: "24px"}} />
    <Card >
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        Ajoutez de nouvelles descriptions
      </Typography>
      { pokemonsDescriptions.length > 0 &&
        pokemonsDescriptions.map((description, index) => 
          createNewPokemonDescriptionLine(description, index)
        )
      }
      <div style={{justifyContent: "space-evenly", display: "flex", paddingTop: "24px"}}>
        <Button variant="contained" size="large" color="primary" onClick={onAddClick}>
          +
        </Button>
      </div>

      </CardContent>
    </Card>
    <div style={{justifyContent: "space-evenly", display: "flex", paddingTop: "24px"}}>
    <Button variant="contained" size="large" color="primary" onClick={createDescription}>Create</Button>
      </div>

    </div>
  );
};

export default Create;
