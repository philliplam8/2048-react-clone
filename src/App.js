import './App.css';
import { TileProvider } from "./TileContext";
import Nav from './Nav';
import Game from './Game';
function App() {
  return (
    <TileProvider>
      <div className="App">
        <Nav />
        <Game />
      </div>
    </TileProvider>
  );
}

export default App;
