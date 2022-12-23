import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import '../App.css';

// The default screen of the front-end which sets the settings for the game.
function Start() {
  const URL = 'http://localhost:5000'

  const defaultData = {
    size: 3,
    win: 3,
    symbol1: "O",
    symbol2: "X",
    firstturn: "random"
  }

  const { register, formState: { errors }, reset, handleSubmit } = useForm({ defaultValues: defaultData })
  const navigate = useNavigate()
  const [start, setStart] = useState(false) // State for whether the start game button has been pressed

  // Sends a POST request to the back-end when the start game button is pressed.
  const onSubmit = async (data) => {
    setStart(true)
    console.log(data)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    const response = await fetch(URL + '/settings', requestOptions)
    const resData = await response.json()
    console.log(resData)
    setStart(false);
    navigate('/game', {state: resData})
  };

  // Resets the settings form to the default values.
  const handleReset= () => {
    reset()
  };

  const limitInput = (e) => {
    if (e.target.value.length > 2) {
      e.target.value = e.target.value.slice(0, 2)
    };
  }

  return (
    <div className="wrapper">
      <h1>Configurable Tic Tac Toe</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={start} className="fieldset">
          <label>
            <p>Select a grid size between 3 and 15:</p>
            <input type="number" min="3" max="15" onInput={e => limitInput(e)} {...register("size", { required: true, step:"1", min:"3", max:"15"})}/>
            <div>
              {(errors.size?.type=="required" || errors.size?.type=="min" || errors.size?.type=="max") && (
                <span style={{color:"red"}}>The grid size must be between 3 and 15.</span>
              )}
            </div>
          </label>
          <label>
            <p>Select the number of matches in a row to win between 3 and 5:</p>
            <input type="number" min="3" max="5" onInput={e => limitInput(e)} {...register("win", { required: true, step:"1", min:"3", max:"5"})}/>
            <div>
              {(errors.win?.type=="required" || errors.win?.type=="min" || errors.win?.type=="max") && (
                <span style={{color:"red"}}>The win condition must be between 3 and 5.</span>
              )}
            </div>
          </label>
          <label>
            <p>Select the letter to represent player 1: (eg. O)</p>
            <input type="text" maxLength="1" {...register("symbol1", { required: true, minLength:"1", maxLength:"1", pattern: /[A-Za-z]/})}/>
            <div>
            {(errors.symbol1?.type=="required" || errors.symbol1?.type=="minLength" || errors.symbol1?.type=="maxLength" || errors.symbol1?.type=="pattern") && (
                <span style={{color:"red"}}>The symbol must be a single letter.</span>
              )}
            </div>
          </label>
          <label>
            <p>Select the letter to represent player 2: (eg. X)</p>
            <input type="text" maxLength="1" {...register("symbol2", { required: true, minLength:"1", maxLength:"1", pattern: /[A-Za-z]/})}/>
            <div>
            {(errors.symbol2?.type=="required" || errors.symbol2?.type=="minLength" || errors.symbol2?.type=="maxLength" || errors.symbol2?.type=="pattern") && (
                <span style={{color:"red"}}>The symbol must be a single letter.</span>
              )}
            </div>
          </label>
          <label>
            <p>Select who will go first:</p>
            <select name="firstturn">
              <option value="random">Random Player</option>
              <option value="player1">Player 1</option>
              <option value="player2">Player 2</option>
            </select>
          </label>
        </fieldset>
        <div>
          <button type="submit" disabled={start}>Start Game</button>   <button onClick={handleReset} disabled={start}>Reset</button>
        </div>
      </form>
      {start &&
       <div>Loading...</div>
      }
    </div>
  );
}

export default Start;
