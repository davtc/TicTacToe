import React from 'react';
import {useLocation} from "react-router-dom"
  
function Game () {
    const location = useLocation();
    const state = location.state
    const { grid, result, symbol1, symbol2, turn } = state
    console.log(grid)
    return <h1>Hello World</h1>
}
  
export default Game;