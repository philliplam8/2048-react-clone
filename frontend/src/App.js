import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme';
import { TileProvider } from "./TileContext";
import Nav from './components//Nav/Nav';
import Board from './components/Board/Board';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <TileProvider>
        <div className="App">
          <Nav />
          <Board />
          <Footer />
        </div>
      </TileProvider>
    </ThemeProvider>
  );
}

export default App;
