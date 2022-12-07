import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <h1>Game Settings</h1>
      <form>
        <fieldset>
          <label>
            <p>Select a grid size</p>
            <input name="size" />
          </label>
          <label>
            <p>Select the number of matches in a row to win</p>
            <input name="win" />
          </label>
          <label>
            <p>Select the letter to represent player 1 (eg. O)</p>
            <input name="symbol1" />
          </label>
          <label>
            <p>Select the letter to represent player 2 (eg. X)</p>
            <input name="symbol2" />
          </label>
        </fieldset>
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

export default App;
