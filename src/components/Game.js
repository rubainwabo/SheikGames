import React, { useState } from "react";
import { initializeGameState } from "../utils/gameUtils.js";
import Player from "./Player.js";
import { timer } from "../logic/timer.js";
import { MiddleCard } from "./MiddleCard.js";

const Game = ({ numberOfPlayers }) => {
  const [gameState, setGameState] = useState(initializeGameState(numberOfPlayers));
  const [turnTimeLeft, setTurnTimeLeft] = useState(20);

  timer(turnTimeLeft, setTurnTimeLeft, gameState, setGameState);

  function checkPlayerHasCardsLeft(player, index) {
    return (
      <Player
        key={index} 
        player={player}
        index={index}
        gameState={gameState}
        setGameState={setGameState}
        setTurnTimeLeft={setTurnTimeLeft}
      />
    )
  }

  return (
    <div>
      <div>
        <MiddleCard gameState={gameState}/>
        <h3>Time left: {turnTimeLeft} seconds</h3>
        {gameState.players.map((player, index) => checkPlayerHasCardsLeft(player, index))}
      </div>
    </div>
  );
};

export default Game;
