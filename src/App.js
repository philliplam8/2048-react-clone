import './App.css';
import { TileProvider } from "./TileContext";
import Nav from './components/Nav';
import Board from './components/Board';
import Footer from './components/Footer';

function App() {

  return (
    <TileProvider>
      <div className="App">
        <Nav />
        <Board />
        <Footer />
      </div>
    </TileProvider>
  );
}

export default App;
