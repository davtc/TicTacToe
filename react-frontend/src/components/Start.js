import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import '../App.css';
import App from '../App' 

function Start() {
  const URL = 'http://localhost:5000'

  const defaultData = {
    size: 3,
    win: 3,
    symbol1: "O",
    symbol2: "X"
  }

  const { register, formState: { errors }, reset, handleSubmit } = useForm({ defaultValues: defaultData });
  const navigate = useNavigate();
  const [start, setStart] = useState(false);

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

  const handleReset= () => {
    reset()
  };

  return (
    <div className="wrapper">
      <h1>Scalable Tic Tac Toe</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={start} className="fieldset-auto-width">
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

export default Start;
