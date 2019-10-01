import React from "react";
import "./Button.css";

function Button(props) {
  
    return (
      <button className="btn btn-primary" id={props.id} onClick={() => props.handleClick()}> {props.message} </button>
    );
  }

export default Button;