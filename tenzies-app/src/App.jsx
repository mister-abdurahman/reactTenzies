import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die";

function App() {
  const [dice, setDice] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false);

  const [rollTimes, setRollTimes] = useState(0);

  useEffect(() => {
    setRollTimes((prev) => {
      return prev + 1;
    });
  }, [dice]);

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
    if (!tenzies) {
      setDice((prev) =>
        prev.map((el) => {
          return el.isHeld ? el : generateNewDie();
        })
      );
    } else {
      setDice(allNewDice());
      setTenzies(false);
    }
  }
  function holdDice(id) {
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
      <div className="box-container">{diceElements}</div>
      <button className="roll-dice-btn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll Dice"}
      </button>
      {/* {tenzies ? (
        <button className="roll-dice-btn" onClick={resetGame}>
          New Game
        </button>
      ) : (
        <button className="roll-dice-btn" onClick={rollDice}>
          Roll Dice
        </button>
      )} */}
    </main>
  );
}

export default App;

// Extra Features (42)
