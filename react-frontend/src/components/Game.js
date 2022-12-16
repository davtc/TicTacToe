import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import Square from './Square.js'

// The function component that handles the game logic.
function Game () {
    const URL = 'http://localhost:5000'
    // Disable the grid while its waiting for a move to update
    let disable = false
    // State for whether the game is over or not. -1: Ongoing, 0: Draw, 1: Win
    const [finished, SetFinished] = useState(-1)
    const location = useLocation();
    const navigate = useNavigate()
    const state = location.state
    let { size, grid, win, symbol1, prev_moves1, symbol2, prev_moves2, firstturn, turn, result, move_success } = state
    
    // Checks if a move has already been made on a square.
    const checkSquare = (row, col) => {
        if (!disable && grid[row][col] == 0) {
            return true
        } else {
            return false
        }
    }

    // Function to send a POST request to the flask sever to obtain an updated game state.
    const updateGame = async (data, route) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        const response = await fetch(URL + route, requestOptions)
        const resData = await response.json()
        console.log(resData)

        grid = resData.grid
        prev_moves1 = resData.prev_moves1
        prev_moves2 = resData.prev_moves2
        turn = resData.turn
        result = resData.result
        move_success = resData.move_success

        if (result == -1) {
            setPlayerColour(textColour(turn))
            setPlayerTurn(playerSymbol(turn))
            disable = false
        } else if (result == 0) {
            SetFinished(0)
        } else {
            SetFinished(1)
        }
        SetDisplay(displayGrid(grid))
    }
    // Function that gets called when a square gets clicked.
    const handleMoveClick = async (index) => {
        const row = ~~(index / size)
        const col = index % size
        if (checkSquare(row, col)) {
            disable = true
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
            updateGame(data, '/game')
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
    function displayGrid(grid) { 
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
                            handleClick={() => {handleMoveClick(index)}}/>
                )})}
            </div>
        )})
    }

    // State of the display for the game board
    const [display, SetDisplay] = useState(displayGrid(grid))

    // Resets the current game when the restart button is pressed
    
    // Navigate to the settings page when the settings button is clicked
    const handleSettingsClick = () => {
        navigate('/')
    }

    // Resets the current game when the restart button is pressed
    const handleRestartCLick = () => {
        SetFinished(-1)
        const data = {
            size: size,
            win: win,
            symbol1: symbol1,
            symbol2: symbol2,
            firstturn: firstturn
        }
        updateGame(data, '/settings')
    }
    return (
        <div className="wrapper">
            <h1>Configurable Tic Tac Toe</h1>
            <div>
                <fieldset className="fieldset">
                {display}
                </fieldset>
            </div> {
                    finished == -1 && <h2> Waiting for  <span style={{color: playerColour}}>Player {playerturn}</span> to make a move...</h2>
                    } {
                    finished == 0 && <h2>Draw!</h2>
                    } {
                    finished == 1 && <h2> <span style={{color: playerColour}}>Player {playerturn}</span> wins!</h2>
                    }
            <div>
            <button className="button-style" onClick={handleRestartCLick}>Restart</button> <button className="button-style" onClick={handleSettingsClick}>Settings</button>
            </div>
        </div>

      
    )
}
  
export default Game;