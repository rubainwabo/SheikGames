import { findNextPlayer } from "../utils/gameUtils.js";

export function drawCard(playerIndex, gameState, setGameState, setTurnTimeLeft) {
    const { players, deck } = gameState;
    const newPlayers = [...players];
    let newDeck = [...deck];

    if (newDeck.length > 0) newPlayers[playerIndex].hand.push(newDeck.pop());

    const nextPlayerIndex = findNextPlayer(playerIndex, newPlayers);
    
    setGameState({
      ...gameState,
      players: newPlayers,
      deck: newDeck,
      currentPlayerIndex: nextPlayerIndex,
    });

    setTurnTimeLeft(20); // Reset the timer for the next player
  }