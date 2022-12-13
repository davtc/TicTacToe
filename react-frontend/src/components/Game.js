import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import Square from './Square.js'

// The function component that handles the game logic.
function Game () {
    const URL = 'http://localhost:5000'
    // State to disable the grid while its waiting for a move to update
    const [disable, SetDisable] = useState(true)

    const location = useLocation();
    const state = location.state
    let { size, grid, win, symbol1, prev_moves1, symbol2, prev_moves2, turn, result, move_success } = state
    
    // Checks if a move has already been made on a square.
    const checkSquare = (row, col) => {
        if (grid[row][col] == 0) {
            return true
        } else {
            return false
        }
    }

    // Function that gets called when a square gets clicked.
    const handleMove = async (index) => {
        const row = ~~(index / size)
        const col = index % size
        console.log(row, col)
        if (checkSquare(row, col)) {
            SetDisable(true)
            // Send POST request to the flask server with the following JSON object when an empty square is clicked
            const data = {
                size: size,
                grid: grid,
                win: win,
                symbol1: symbol1,
                prev_moves1: prev_moves1,
                symbol2: symbol2,
                prev_moves2: prev_moves2,
                turn: turn,
                move: [row, col]
            }
            console.log(data)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }
            const response = await fetch(URL + '/game', requestOptions)
            const resData = await response.json()
            console.log(resData)

            grid = resData.grid
            prev_moves1 = resData.prev_moves1
            prev_moves2 = resData.prev_moves2
            turn = resData.turn
            result = resData.result
            move_success = resData.move_success

            SetDisable(false)
            setPlayerColour(textColour(turn))
            setPlayerTurn(playerSymbol(turn))
            SetDisplay(printGrid(grid))
        }
        else {
            console.log('Move invalid')
        }
    }

    const textColour = (val) => {
        if (val == 1) {
            return 'blue'
        } else {
            return 'red'
        }
    }

    // State for the colour of the current player making a turn.
    const [playerColour, setPlayerColour] = useState(textColour(turn));

    const playerSymbol = (val) => {
        if (val == 0) {
            return ""
        }
        else if (val == 1) {
            return symbol1
        } else {
            return symbol2
        }
    }

    // State for the symbol of the current player making a turn.
    const [playerturn, setPlayerTurn] = useState(playerSymbol(turn));

    // Display the game board as a series of squares.
    function printGrid(grid) { 
        return grid.map((rows, indexrow) => {
        return (
            <div key={indexrow}>
                {rows.map((val, indexcol) => {
                    const index = size*indexrow + indexcol
                return (
                    <Square key={index}
                            index={index}
                            symbol={playerSymbol(val)}
                            colour={textColour(val)}
                            handleClick={() => {handleMove(index)}}
                            disabled={disable}/>
                )})}
            </div>
        )})
    }

    // State of the display for the game board
    const [display, SetDisplay] = useState(printGrid(grid))
    
    return (
        <div className="wrapper">
            <h1>Configurable Tic Tac Toe</h1>
            <div>
                <fieldset className="fieldset-auto-width">
                {display}
                </fieldset>
            </div>
            <h2> Waiting for  <span style={{color: playerColour}}>Player {playerturn}</span> to make a move...</h2>
        </div>
    )
}
  
export default Game;