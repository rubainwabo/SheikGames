import { canPlayCard, drawCard, findNextPlayer } from "./playCardUtils.js";

export function playCard(playerIndex, card, gameState, setGameState, setTurnTimeLeft) {
    if (gameState.currentPlayerIndex !== playerIndex || gameState.players[playerIndex].qualified) return;

    const { middleCard, players, oldDeck, currentPlayerIndex } = gameState;

    if (canPlayCard(card, middleCard)) {
      const newPlayers = [...players];
      newPlayers[playerIndex].hand = newPlayers[playerIndex].hand.filter((c) => c !== card);

      // Saving the old middle card
      let newOldDeck = [...oldDeck];
      newOldDeck.push(middleCard);

      let nextPlayerIndex = findNextPlayer(currentPlayerIndex, newPlayers, gameState);
      let newMiddleCard = card;

      // Handle special cards
      if (card.value === "A") {
        nextPlayerIndex = findNextPlayer(nextPlayerIndex, newPlayers, gameState); // Skip one player
      } else if (card.value === "7") {
        forceNextPlayerToDrawCards(2, gameState, setGameState);
      } else if (card.value === "joker") {
        forceNextPlayerToDrawCards(4, gameState, setGameState);
      } else if (card.value === "J") {
        changeMiddleCardSuit(card.suit, gameState, setGameState); // TODO add the logic for the new middle card suit
      }

      // Mark player as qualified if no cards left
      if (newPlayers[playerIndex].hand.length === 0) {
        newPlayers[playerIndex].qualified = true;
      }

      setGameState({
        ...gameState,
        oldDeck: newOldDeck,
        players: newPlayers,
        middleCard: newMiddleCard,
        currentPlayerIndex: nextPlayerIndex,
      });

      setTurnTimeLeft(20);
    } else {
      drawCard(playerIndex, gameState, setGameState, setTurnTimeLeft);
    }
  }

  function forceNextPlayerToDrawCards(count, gameState, setGameState) {
    const { currentPlayerIndex, players, deck } = gameState;
    const nextPlayerIndex = findNextPlayer(currentPlayerIndex, players, gameState);
    const newPlayers = [...players];
    const newDeck = [...deck];

    for (let i = 0; i < count; i++) {
      if (newDeck.length > 0) {
        newPlayers[nextPlayerIndex].hand.push(newDeck.pop());
      }
    }

    setGameState({
      ...gameState,
      players: newPlayers,
      deck: newDeck,
      currentPlayerIndex: nextPlayerIndex,
    });
  }

  function changeMiddleCardSuit(newSuit, gameState, setGameState) {
    setGameState({
      ...gameState,
      middleCard: { ...gameState.middleCard, suit: newSuit },
    });
  }