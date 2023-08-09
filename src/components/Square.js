import React from "react";
import "./square.css"

const Square = ({ value, ck }) => {
  return(
    <button className="square"
      onClick={ (e)=> ck() }
    >
      {value}
    </button>
  )
}
export default Square