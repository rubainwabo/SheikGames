import { createContext, useContext, useState } from 'react';
import { initializeGameState } from '../utils/gameUtils';

const GameStateContext = createContext();

export const GameStateContextProvider = ({ children }) => {
  const [gameState, setGameState] = useState(initializeGameState(4));
  const [turnTimeLeft, setTurnTimeLeft] = useState(20);

  return (
    <GameStateContext.Provider 
        value={{ gameState, setGameState, turnTimeLeft, setTurnTimeLeft }}>
        {children}
    </GameStateContext.Provider>
  );
}

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("useGameState must be used within a GameStateContextProvider");
  }
  return context;
}