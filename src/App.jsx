import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die";

function App() {
  const [dice, setDice] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false);

  const [rollTimes, setRollTimes] = useState(0);

  const [time, setTime] = useState(0);

  const [bestRoll, setBestRoll] = useState(100);

  // let interval;
  // let startTheTimer = true;

  function theCounter() {
    setTime((prev) => prev + 1);
  }
  //  put startCount fn in a use effect to make it run only once.
  // function startCount() {
  //   if (!startTheTimer) return;
  //   interval = setInterval(theCounter, 4000);
  // }
  // function stopCount() {
  //   clearInterval(interval);
  //   setTime(0);
  //   startTheTimer = false;
  // }

  useEffect(() => {
    // startTheTimer && startCount();
    const interval = setInterval(theCounter, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [rollTimes, tenzies]);

  // useEffect(() => {
  //   stopCount();
  // }, [startTheTimer]);

  useEffect(() => {
    if (tenzies) {
      setBestRoll((prev) => {
        if (prev > rollTimes) {
          localStorage.setItem("best-roll", JSON.stringify(rollTimes));
          return (prev = rollTimes);
        } else {
          return prev;
        }
      });
      setTime(0);
    }
  }, [tenzies]);

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
    // startCount();
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
      setRollTimes(0);
      setDice(allNewDice());
      setTenzies(false);
      stopCount();
    }
  }
  function holdDice(id) {
    setDice((prevData) =>
      prevData.map((el) => {
        return el.id === id ? { ...el, isHeld: !el.isHeld } : el;
      })
    );
  }
  function restartGame() {
    setDice(allNewDice());
    setTenzies(false);
    setRollTimes(0);
    setTime(0);
  }

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
        <div className="num-rolls">Time: {time}s</div>
        <div className="num-rolls">
          {/* Best Roll is {bestRoll !== 100 && bestRoll} */}
          Best Roll is{" "}
          {bestRoll !== 100 && JSON.parse(localStorage.getItem("best-roll"))}
          {/* {tenzies &&
            ((prev) => {
              if (prev > rollTimes) {
                return (prev = rollTimes);
              } else {
                return prev;
              }
            })} */}
        </div>
      </div>
      <div className="box-container">{diceElements}</div>
      <div className="flex-this">
        <button className="roll-dice-btn" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll Dice"}
        </button>
        <button className="roll-dice-btn" onClick={restartGame}>
          Restart
        </button>
      </div>
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
