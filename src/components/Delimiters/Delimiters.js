import React from "react";
import "./Delimiters.css";

function Delimiters(props) {
  
    return (
      <button className="btn btn-primary" id={props.id} onClick={() => props.handleClick()}> {props.message} </button>
    );
  }

export default Delimiters;