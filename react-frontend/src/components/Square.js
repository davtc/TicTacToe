import React, { useState } from 'react'
import '../App.css'
import Game from './Game'


// The individual square cell for the grid.
function Square(props) {
    const playerColour = (val) => {
        if (val == 1) {
            return 'blue'
        } else {
            return 'red'
        }
    }
    const playerSymbol = (val) => {
        if (val == 0) {
            return ""
        }
        else if (val == 1) {
            return props.player1symbol
        } else {
            return props.player2symbol
        }
    }

    return (
        <div className="square" onClick={props.handleClick}>
            <span className="square-text" style={{color: playerColour(props.val)}}>{playerSymbol(props.val)}</span>
        </div>
    )
}

export default Square