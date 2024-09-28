import React from "react";
import Card from "./Card.jsx";

const Player = ({ player, index, setTurnTimeLeft }) => {
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
          />
        ))}
      </div>
    </div>
  );
};

export default Player;
