import React, { useState } from 'react'
import '../App.css'


// The individual square cell for the grid.
function Square(props) {
    const [hovering, setHovering] = useState(false); // State to check whether the square is being hovered
    const [filled, setFilled] = useState(false) // State to check whether the square is filled already

    // Function to handle a mouse cursor hovering the square
    const handleSquareHover = () => {
        setHovering(true)
        setFilled(() => {
            if (props.symbol == "") {
                return false
            } else {
                return true
            }
        })
    }
    
    // Function to handle a mouse cursor leaving the square
    const handleSquareOut = () => {
        setHovering(false)
    }

    return (
        <div className="square" onMouseOver={handleSquareHover} onMouseOut={handleSquareOut} onClick={props.handleClick}>
            <span className="square-text" style={{color:props.colour}}>{props.symbol}</span>
            {hovering && !filled && <span className="square-text" style={{color:props.playercolour}}>{props.playerturn}</span>}
        </div>
    )
}

export default Square