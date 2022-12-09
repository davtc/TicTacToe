import React, { useReducer, useState } from 'react';
import { useForm } from "react-hook-form";
import './App.css';

/* const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
 }

function App() {
  const [settingData, setSettingData] = useReducer(formReducer, {
    size: 3,
    win: 3,
    symbol1: "O",
    symbol2: "X"
  });
  const [start, setStart] = useState(false);
  
  const handleStart = event => {
    event.preventDefault();
    setStart(true);
    console.log(settingData)
 
    setTimeout(() => {
      setStart(false);
    }, 3000)
  }

  const handleReset = () => {
    setSettingData({
      size: 3,
      win: 3,
      symbol1: "O",
      symbol2: "X"
    });
  }

  const handleChange = event => {
    setSettingData({
      name: event.target.name,
      value: event.target.value,
    });
  }

  return (
    <div className="wrapper">
      <h1>Game Settings</h1>
      <form onSubmit={handleStart}>
        <fieldset disabled={start}>
          <label>
            <p>Select a grid size between 3 and 15</p>
            <input type="number" name="size" required step="1" min="3" max="15" onChange={handleChange} value={settingData.size}/>
          </label>
          <label>
            <p>Select the number of matches in a row to win between 3 and 5</p>
            <input type="number" name="win" required step="1" min="3" max="5" onChange={handleChange} value={settingData.win}/>
          </label>
          <label>
            <p>Select the letter to represent player 1 (eg. O)</p>
            <input type="text" name="symbol1" required minLength="1" maxLength="1" onChange={handleChange} value={settingData.symbol1}/>
          </label>
          <label>
            <p>Select the letter to represent player 2 (eg. X)</p>
            <input type="text" name="symbol2" required minLength="1" maxLength="1" onChange={handleChange} value={settingData.symbol2}/>
          </label>
        </fieldset>
        <div>
          <button type="submit" disabled={start}>Start Game</button>
        </div>
      </form>
      {start &&
       <div>Loading...</div>
      }
    </div>
  );
} */

function App() {
  const defaultData = {
    size: 3,
    win: 3,
    symbol1: "O",
    symbol2: "X"
  }

  const { register, formState: { errors }, reset, handleSubmit } = useForm({ defaultValues: defaultData });
  const [start, setStart] = useState(false);

  const onSubmit = (data) => {
    setStart(true)
    console.log(data)

    setTimeout(() => {
      setStart(false);
    }, 3000)
  };

  const handleReset= () => {
    reset()
  };

  return (
    <div className="wrapper">
      <h1>Game Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={start} class="fieldset-auto-width">
          <label>
            <p>Select a grid size between 3 and 15</p>
            <input type="number" {...register("size", { required: true, step:"1", min:"3", max:"15"})}/>
            <div>
              {(errors.size?.type=="required" || errors.size?.type=="min" || errors.size?.type=="max") && (
                <span style={{color:"red"}}>The grid size must be between 3 and 15.</span>
              )}
            </div>
          </label>
          <label>
            <p>Select the number of matches in a row to win between 3 and 5</p>
            <input type="number" {...register("win", { required: true, step:"1", min:"3", max:"5"})}/>
            <div>
              {(errors.win?.type=="required" || errors.win?.type=="min" || errors.win?.type=="max") && (
                <span style={{color:"red"}}>The win condition must be between 3 and 5.</span>
              )}
            </div>
          </label>
          <label>
            <p>Select the letter to represent player 1 (eg. O)</p>
            <input type="text" {...register("symbol1", { required: true, minLength:"1", maxLength:"1", pattern: /[A-Za-z]/})}/>
            <div>
            {(errors.symbol1?.type=="required" || errors.symbol1?.type=="minLength" || errors.symbol1?.type=="maxLength" || errors.symbol1?.type=="pattern") && (
                <span style={{color:"red"}}>The symbol must be a single letter.</span>
              )}
            </div>
          </label>
          <label>
            <p>Select the letter to represent player 2 (eg. X)</p>
            <input type="text" {...register("symbol2", { required: true, minLength:"1", maxLength:"1", pattern: /[A-Za-z]/})}/>
            <div>
            {(errors.symbol2?.type=="required" || errors.symbol2?.type=="minLength" || errors.symbol2?.type=="maxLength" || errors.symbol2?.type=="pattern") && (
                <span style={{color:"red"}}>The symbol must be a single letter.</span>
              )}
            </div>
          </label>
        </fieldset>
        <div>
          <button type="submit" disabled={start}>Start Game</button>
        </div>
      </form>
      <button onClick={handleReset}>Reset</button>
      {start &&
       <div>Loading...</div>
      }
    </div>
  );
}

export default App;
