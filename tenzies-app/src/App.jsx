import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die";

function App() {
  const [dice, setDice] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false);

  const [rollTimes, setRollTimes] = useState(0);

  const [time, setTime] = useState(0)
 
 let interval;

 function theCounter(){
  setTime((prev)=> prev + 1)
 }
//  put startCount fn in a use effect to make it run only once.
 function startCount(){
  clearInterval(interval)
  interval = setInterval(theCounter, 1000)
 }
 function stopCount(){
 clearInterval(interval)
 setTime(0)
 }

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSame = dice.every((die) => firstValue === die.value);
    if (allHeld && allSame) {
      setTenzies(true);
    }
  }, [dice]);

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        id={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
        tenzies={tenzies}
      />
    );
  });

  //(refactoring) helper fn to generate new die:
  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }


  function allNewDice() {
    const newDice = [];
    for (let x = 0; x < 10; x++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    // startCount()
    if (!tenzies) {
      setRollTimes((prev) => {
        return prev + 1;
      });
      setDice((prev) =>
        prev.map((el) => {
          return el.isHeld ? el : generateNewDie();
        })
      );
    } else {
      setRollTimes(0)
      setDice(allNewDice());
      setTenzies(false);
    }
  }
  function holdDice(id) {
    clearInterval(updateTestTimer)
    setDice((prevData) =>
      prevData.map((el) => {
        return el.id === id ? { ...el, isHeld: !el.isHeld } : el;
      })
    );
  }
  // function resetGame() {
  //   setDice(allNewDice());
  //   setTenzies(false);
  // }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="flex-this">
      <div className="num-rolls">Rolls: {rollTimes}</div>
      <div className="num-rolls">Time: {time}</div>
      </div>
      <div className="box-container">{diceElements}</div>
      <button className="roll-dice-btn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll Dice"}
      </button>
    </main>
  );
}

export default App;

// Timer:
// 1. set a state for timer in seconds
// 2. start counting when user clicks "roll dice"
// 3. stop counting when user wins game and set to 0
// 4. Save "roll times" and "count time" in local storage
// 5. Compare the two above with new ones and save the higest for each of 'em,  then dsplay it.