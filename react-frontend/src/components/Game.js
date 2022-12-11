import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import Square from './Square.js'
  
function Game () {
    const location = useLocation();
    const state = location.state
    const { size, grid, result, symbol1, symbol2, turn } = state
    const [playerturn, setPlayerTurn] = useState(() => {
        if (turn == 1 ) {
            return symbol1
        } else {
            return symbol2
        }
    });

    const printGrid = grid.map((row, indexrow) => {
        return (
            <div key={indexrow}>
                {row.map((val, indexcol) => {
                return (
                <Square key={size*indexrow + indexcol}/>
                )})}
            </div>
        )})

    return (
        <div className="wrapper">
            <h1>Scalable Tic Tac Toe</h1>
            <div>
                {printGrid}
            </div>
            <h2> Waiting for Player {playerturn} to make a move...</h2>
        </div>
    )
}
  
export default Game;