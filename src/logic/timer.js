import { useEffect } from "react";
import { drawCard } from "./playCardUtils.js";

export function timer(turnTimeLeft, setTurnTimeLeft, gameState, setGameState) {
    useEffect(() => {
        if (turnTimeLeft === 0) {
          // If time runs out, the current player draws a card
          drawCard(gameState.currentPlayerIndex, gameState, setGameState, setTurnTimeLeft);
          setTurnTimeLeft(20); // Reset the timer for the next player
        }
    
        const timer = setTimeout(() => {
          setTurnTimeLeft(turnTimeLeft - 1);
        }, 1000);
    
        return () => clearTimeout(timer);
      }, [turnTimeLeft, gameState.currentPlayerIndex]);
}