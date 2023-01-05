import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme';
import { ScoreProvider } from './ScoreContext';
import { TileProvider } from "./TileContext";
import Nav from './components//Nav/Nav';
import Board from './components/Board/Board';
import Footer from './components/Footer/Footer';


function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ScoreProvider>
          <TileProvider>
            <Nav />
            <Board />
            <Footer />
          </TileProvider>
        </ScoreProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
