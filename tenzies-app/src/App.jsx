import { useState } from "react";
import { nanoid } from "nanoid";
import Die from "./Die";

function App() {
  const [dice, setDice] = useState(allNewDice());

  const diceElements = dice.map((data) => {
    return <Die key={data.id} value={data.value} isHeld={data.isHeld} />;
  });

  function allNewDice() {
    const newDice = [];
    for (let x = 0; x < 10; x++) {
      newDice.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }
    return newDice;
  }

  function rollDice() {
    setDice(allNewDice());
  }

  return (
    <main>
      <div className="box-container">{diceElements}</div>
      <button className="roll-dice-btn" onClick={rollDice}>
        Roll Dice
      </button>
    </main>
  );
}

export default App;
