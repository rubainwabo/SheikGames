import { printCard } from "../utils/gameUtils.js";
import { playCard } from "../logic/playCard.js";

const Card = ({card, cardIndex, index, gameState, setGameState, setTurnTimeLeft}) => {
    return (
        <button
            key={cardIndex}
            onClick={() => playCard(index, card, gameState, setGameState, setTurnTimeLeft)}
            disabled={gameState.currentPlayerIndex !== index}
        >
        {printCard(card)}
      </button>
    )
}

export default Card;