import { Route, Routes } from "react-router-dom";
import Start from './components/Start'
import Game from './components/Game'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;