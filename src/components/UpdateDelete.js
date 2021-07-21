import React, { useState, useContext } from "react";
import firebase from "../utils/firebaseConfig";
import { UidContext } from "./UidContext";
import { Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';

const UpdateDelete = ({ item }) => {
  console.log(item[0])
  const [update, setUpdate] = useState(false);
  const uid = useContext(UidContext);

  const updateItem = () => {
    // pointer id de l'élement à update
    let quote = firebase.database().ref(`descriptionsDB/${uid}`).child(item.id);

    // make sure there's no undifined
   /* if (authorUpdate !== null) {
      quote.update({
        author: authorUpdate,
      });
    }
    if (textUpdate !== null) {
      quote.update({
        text: textUpdate,
      });
    }*/
    // repasse update sur false
    setUpdate(false);
  };

  const deleteItem = () => {
    // pointer id de l'élement à delete
    let quote = firebase.database().ref(`descriptionsDB/${uid}/${Object.keys(item)[0]}`);

    quote.remove();
  };

  return (
    <Card>
    <CardContent>
    <li style={{listStyleType: "none"}}>
      {update === false && (
            <div>
            <h4>{Object.keys(item)[0]}</h4>
          {
            Object.entries(Object.values(item)[0]).map((value, index) => 
              <p key={index}>{`${value[0]} : ${value[1]} `}</p>
            )
          }
          {
            <div className="buttons-container">
              {
                //<button onClick={() => setUpdate(!update)}>Update</button>
              }
              <Button variant="contained" color="secondary" onClick={deleteItem}>Delete</Button>
            </div>
        }
            </div>
      )}

      {update && (
        <div className="item-container-update">
          <textarea
            defaultValue={item.name}
            onChange={(e) => {}}
          />
          <input
            type="text"
            defaultValue={""}
            onChange={(e) => {}}
          />
          <button onClick={updateItem}>Validate update</button>
        </div>
      )}
    </li>
    
    </CardContent>
    </Card>
  );
};

export default UpdateDelete;
