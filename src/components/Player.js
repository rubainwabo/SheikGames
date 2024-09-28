import React from "react";
import Card from "./Card.js";

const Player = ({ player, index, gameState, setGameState, setTurnTimeLeft }) => {
  return player.qualified ? (
    <div>
      <h3>Player {index + 1} qualified for the next round!</h3>
    </div>
  ) : (
    <div>
      <h3>Player {index + 1}</h3>
      <div>
        {player.hand.map((card, cardIndex) => (
          <Card
            key={cardIndex}
            card={card}
            cardIndex={cardIndex}
            index={index}
            gameState={gameState}
            setGameState={setGameState}
            setTurnTimeLeft={setTurnTimeLeft}
          />
        ))}
      </div>
    </div>
  );
};

export default Player;
