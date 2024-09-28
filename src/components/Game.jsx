import React, { useState, useEffect } from "react";
import Player from "./Player.jsx";
import MiddleCard from "./MiddleCard.jsx";
import { drawCard } from "../logic/draw.js";
import { useGameState } from "../context/gameStateContext.jsx";

const Game = () => {
  const { gameState, setGameState, turnTimeLeft, setTurnTimeLeft } = useGameState();

  console.log("start of the game size of deck : ", gameState.deck.length);

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

  function checkPlayerHasCardsLeft(player, index) {
    return (
      <Player
        key={index} 
        player={player}
        index={index}
        setTurnTimeLeft={setTurnTimeLeft}
      />
    )
  }

  return (
    <div>
      <div>
        <MiddleCard/>
        <h3>Time left: {turnTimeLeft} seconds</h3>
        {gameState.players.map((player, index) => checkPlayerHasCardsLeft(player, index))}
      </div>
    </div>
  );
};

export default Game;
