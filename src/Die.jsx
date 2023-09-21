import React from "react";

export default function Die(props) {
  function oneDie() {
    return (
      <>
        <div className="die--center"></div>
      </>
    );
  }
  function twoDie() {
    return (
      <>
        <div className="die--top-left"></div>
        <div className="die--bottom-right"></div>
      </>
    );
  }
  function threeDie() {
    return (
      <>
        <div className="die--top-left"></div>
        <div className="die--center"></div>
        <div className="die--bottom-right"></div>
      </>
    );
  }
  function fourDie() {
    return (
      <>
        <div className="die--top-left"></div>
        <div className="die--top-right"></div>
        <div className="die--bottom-right"></div>
        <div className="die--bottom-left"></div>
      </>
    );
  }
  function fiveDie() {
    return (
      <>
        <div className="die--top-left"></div>
        <div className="die--top-right"></div>
        <div className="die--center"></div>
        <div className="die--bottom-right"></div>
        <div className="die--bottom-left"></div>
      </>
    );
  }
  function sixDie() {
    return (
      <>
        <div className="die--top-left"></div>
        <div className="die--top-right"></div>
        <div className="die--center-right"></div>
        <div className="die--center-left"></div>
        <div className="die--bottom-right"></div>
        <div className="die--bottom-left"></div>
      </>
    );
  }
  return (
    <div
      className="box"
      style={{ backgroundColor: props.isHeld ? "#59e391" : "white" }}
      onClick={props.holdDice}
    >
      {props.value === 1 && oneDie()}
      {props.value === 2 && twoDie()}
      {props.value === 3 && threeDie()}
      {props.value === 4 && fourDie()}
      {props.value === 5 && fiveDie()}
      {props.value === 6 && sixDie()}
    </div>
  );
  // return (
  //   <div
  //     className="box"
  //     style={{ backgroundColor: props.isHeld ? "#59e391" : "white" }}
  //     onClick={props.holdDice}
  //   >
  //     <h2 className="die-num">{props.value}</h2>
  //     {/* <div className={`die--${props.value}`}></div> */}
  //   </div>
  // );
}
// 35.
