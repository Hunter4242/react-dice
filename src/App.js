import './App.css';
import { useState } from "react";

function App() {
  const [dieCode, setDieCode] = useState("");
  const [rollResult, setRollResult] = useState("");
  //let rollResult = "";
  let rollList = "";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dieCode);
    let dieCount = 0;
    let dieSides = 0;
    let total = 0;
    const basicDieCodeRegex = new RegExp("^\\d+[d]\\d+$"); //matches only basic die rolls, i.e. 3d6, with no modifiers

    if(basicDieCodeRegex.test(dieCode))
    {
      //roll dice
      const dice = dieCode.split('d');
      const rolls = [];
      dieCount = dice[0];
      dieSides = dice[1];

      for(let i = 0; i < dieCount; i++)
      {
        let roll = Math.floor(Math.random() * (dieSides - 1) + 1);
        rolls.push(roll);
        total = total + roll;
      }
      rollList = "[";
      rolls.forEach(formatRolls);
      let rollStr = rollList.length;
      rollList = rollList.substring(0, rollStr - 2);
      rollList += "] ";

      setRollResult("You got these rolls: " + rollList + "For this total: " + total);
    }
    else
    {
      //error logic
      setRollResult("Invalid die code.");
    }
  }

  function formatRolls(value)
  {
    rollList += value + ", ";
  }

  return (
    <div className="App">
      <h1>Roll Some Dice!</h1>
      <fieldset>
        <form action="#" method="get">
          <label for="dieCode">Dice to Roll</label>
          <input
              type="text"
              name="diecode"
              id="diecode"
              value={dieCode}
              onChange={(e) =>
                  setDieCode(e.target.value)
              }
              placeholder="Enter Die Code in #d# format"
              required
          />
          {/* <button
              type="reset"
              value="reset"
              onClick={() => handleReset()}
          >
              Reset
          </button> */}
          <button
              type="submit"
              value="Submit"
              onClick={(e) => handleSubmit(e)}
          >
              Submit
          </button>
        </form>
      </fieldset>
      <div className="result">
        {rollResult}
      </div>
    </div>
  );
}

export default App;
