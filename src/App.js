import { createRoot } from "react-dom/client";
import Game from "./components/Game.jsx";
import { GameStateContextProvider } from "./context/gameStateContext.jsx";

const App = () => {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <GameStateContextProvider>
    <App />
  </GameStateContextProvider>
);
