import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import Square from './Square.js'

// The function component that handles the game logic.
function Game () {
    const location = useLocation();
    const state = location.state
    const { size, grid, result, symbol1, symbol2, turn } = state
    // State for the symbol of the current player making a turn.
    const [playerturn, setPlayerTurn] = useState(() => {
        if (turn == 1 ) {
            return symbol1
        } else {
            return symbol2
        }
    });
    // State for the colour of the current player making a turn.
    const [playerColour, setPlayerColour] = useState(() => {
        if (turn == 1 ) {
            return 'blue'
        } else {
            return 'red'
        }
    });
    
    // Checks if a move has already been made on a square.
    const checkSquare = (key) => {
        const row = ~~(key / size)
        const col = key % size
        if (grid[row][col] == 0) {
            return true
        } else {
            return false
        }
    }

    // Function that gets called when a square gets clicked.
    const handleMove = (index) => {
        const row = ~~(index / size)
        const col = index % size
        console.log(row, col)
        SetDisplay(printGrid)
    }

    // Display the game board as a series of squares.
    const printGrid = grid.map((row, indexrow) => {
        return (
            <div key={indexrow}>
                {row.map((val, indexcol) => {
                    const index = size*indexrow + indexcol
                return (
                    <Square key={index}
                            index={index}
                            val={val}
                            player1symbol={symbol1}
                            player2symbol={symbol2}
                            handleClick={() => {handleMove(index)}}/>
                )})}
            </div>
        )})

    // State of the display for the game board
    const [display, SetDisplay] = useState(printGrid)
    
    return (
        <div className="wrapper">
            <h1>Configurable Tic Tac Toe</h1>
            <div>
                {display}
            </div>
            <h2> Waiting for  <span style={{color: playerColour}}>Player {playerturn}</span> to make a move...</h2>
        </div>
    )
}
  
export default Game;