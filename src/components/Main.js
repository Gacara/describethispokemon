import React from "react";
import firebase from "../utils/firebaseConfig";
import Describe from "./Describe";
import Read from "./Read";

const Main = () => {
  return (
  <div className="container">
    <div className="header">
        <h1 style={{paddingRight: "20px"}} className="pm-0">React Crud</h1>
        <h4 style={{paddingRight: "20px"}} className="pm-0">Bonjour {firebase.auth().currentUser.displayName}</h4>
        <div onClick={() => firebase.auth().signOut()}>Se déconnecter</div>
    </div>
    <div className="content">
        <Describe />
    </div>
    <div className="viewer">
        <Read />
    </div>
  </div>
  );
};

export default Main;
