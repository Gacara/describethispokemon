import React, { useEffect, useState, useContext } from "react";
import firebase from "../utils/firebaseConfig";
import UpdateDelete from "./UpdateDelete";
import { UidContext } from "./UidContext";

const Read = () => {
  const uid = useContext(UidContext);
  const [pokemonsList, setPokemonsList] = useState([]);

  useEffect(() => {
    const descriptionsDB = firebase.database().ref(`descriptionsDB`);
    console.log(descriptionsDB);

    descriptionsDB.on("value", (snapshot) => {
      
      let previousList = snapshot.val();
      
      if (previousList[uid]) {
        const newPokemonsList = Object.entries(previousList[uid]).map((key) => ({[key[0]]: key[1]}))
        setPokemonsList(newPokemonsList);
      }

    });
  }, [uid]);

  return (
    <div className="read">
      Les descriptions de {firebase.auth().currentUser.displayName} :
      <ul  style={{maxHeight: "75vh", overflow: "auto"}}>
      
        {pokemonsList.length > 0 &&
          pokemonsList.map((item, index) => (
            <UpdateDelete item={item} key={index} />
          ))}
      </ul>
    </div>
  );
};

export default Read;
