import './App.css';
import { TileProvider } from "./TileContext";
import Nav from './components//Nav/Nav';
import Board from './components/Board/Board';
import Footer from './components/Footer/Footer';

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
