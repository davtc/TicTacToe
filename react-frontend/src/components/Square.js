import React from 'react'
import '../App.css'


// The individual square cell for the grid.
function Square(props) {
    return (
        <div className="square" onClick={props.handleClick}>
            <span className="square-text" style={{color:props.colour}}>{props.symbol}</span>
        </div>
    )
}

export default Square