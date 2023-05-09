import React from "react";

export default function Die(props) {
  return (
    <div
      className="box"
      style={{ backgroundColor: props.isHeld ? "#59e391" : "white" }}
    >
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
// 35.
