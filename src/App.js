import { createRoot } from "react-dom/client";
import Game from "./components/Game.js";

const App = () => {
  return (
    <div className="App">
      <Game numberOfPlayers={4} />
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
