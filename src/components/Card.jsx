import { printCard, findNextPlayer } from "../utils/gameUtils.js";
import { useGameState } from "../context/gameStateContext.jsx";
import { canPlayCard } from "../logic/playCardUtils.js";
import { drawCard } from "../logic/draw.js";

const Card = ({card, cardIndex, index}) => {
    const { gameState, setGameState, turnTimeLeft, setTurnTimeLeft } = useGameState();

    function playCard(playerIndex, card) {
        if (gameState.currentPlayerIndex !== playerIndex || gameState.players[playerIndex].qualified) return;
    
        const { middleCard, players, currentPlayerIndex } = gameState;
    
        if (canPlayCard(card, middleCard)) {
          const newPlayers = [...players];
          newPlayers[playerIndex].hand = newPlayers[playerIndex].hand.filter((c) => c !== card);
    
          let nextPlayerIndex = findNextPlayer(currentPlayerIndex, newPlayers, gameState);
          let newMiddleCard = card;
    
          // Handle special cards
          if (card.value === "A") {
            nextPlayerIndex = findNextPlayer(nextPlayerIndex, newPlayers); // Skip one player
          } else if (card.value === "7") {
            forceNextPlayerToDrawCards(2);
          } else if (card.value === "joker") {
            forceNextPlayerToDrawCards(4);
          } else if (card.value === "J") {
            changeMiddleCardSuit(card.suit); // TODO add the logic for the new middle card suit
          }
    
          // Mark player as qualified if no cards left
          if (newPlayers[playerIndex].hand.length === 0) {
            newPlayers[playerIndex].qualified = true;
          }
    
          setGameState({
            ...gameState,
            players: newPlayers,
            middleCard: newMiddleCard,
            currentPlayerIndex: nextPlayerIndex,
          });
    
          setTurnTimeLeft(20);
        } else {
          drawCard(playerIndex, gameState, setGameState, setTurnTimeLeft);
        }
      }
    
      function forceNextPlayerToDrawCards(count) {
        const { currentPlayerIndex, players, deck } = gameState;
        const nextPlayerIndex = findNextPlayer(currentPlayerIndex, players, gameState);
        const newPlayers = [...players];
        const newDeck = [...deck];
    
        for (let i = 0; i < count; i++) {
          if (newDeck.length > 0) {
            newPlayers[nextPlayerIndex].hand.push(newDeck.pop());
          }
        }
    
        console.log("newDeck size inside forceNextPlayerToDrawCards : ", newDeck.length);
    
        setGameState({
          ...gameState,
          players: newPlayers,
          deck: newDeck,
          currentPlayerIndex: nextPlayerIndex,
        });
      }
    
      function changeMiddleCardSuit(newSuit) {
    
        setGameState({
          ...gameState,
          middleCard: { ...gameState.middleCard, suit: newSuit },
        });
      }

    return (
        <button
            key={cardIndex}
            onClick={() => playCard(index, card)}
            disabled={gameState.currentPlayerIndex !== index}
        >
        {printCard(card)}
      </button>
    )
}

export default Card;