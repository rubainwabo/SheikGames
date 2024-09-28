import { shuffleDeck } from "../utils/gameUtils.js";

export function canPlayCard(card, middleCard) {
    if (card.value !== "joker") {
      if (middleCard.value === "joker") {
        return (
          (card.value === "7") ||
          ((card.suit === "hearts" || card.suit === "diamonds") && middleCard.color === "red") ||
          ((card.suit === "clubs" || card.suit === "spades") && middleCard.color === "black")
        );
      } else {
        return (
          card.suit === middleCard.suit || 
          card.value === middleCard.value ||
          card.value === "J"
        );
      }
    } else {
      if (middleCard.value !== "joker" && middleCard.value !== "7") {
        if (middleCard.suit === "hearts" || middleCard.suit === "diamonds") {
          return card.color === "red";
        } else {
          return card.color === "black";
        }
      } else {
        return true;
      }
    }
  }

  export function drawCard(playerIndex, gameState, setGameState, setTurnTimeLeft) {
    const { players, deck, oldDeck } = gameState;
    const newPlayers = [...players];
    let newDeck = [...deck];
    let newOldDeck = [...oldDeck];

    console.log("Inside drawCard size of the deck  : ", deck.length, " size of the newOldDeck : ",
      newOldDeck.length
    );

    if (newDeck.length > 0) {
      newPlayers[playerIndex].hand.push(newDeck.pop());
    } else if (oldDeck.length > 0) {
      shuffleDeck(oldDeck);
      newPlayers[playerIndex].hand.push(oldDeck.pop());
      newDeck = [...oldDeck];
      newOldDeck = [];
    }

    const nextPlayerIndex = findNextPlayer(playerIndex, newPlayers, gameState);
    
    setGameState({
      ...gameState,
      players: newPlayers,
      deck: newDeck,
      oldDeck: newOldDeck,
      currentPlayerIndex: nextPlayerIndex,
    });

    setTurnTimeLeft(20); // Reset the timer for the next player
  }

  export function findNextPlayer(currentPlayerIndex, players, gameState) {
    let nextPlayerIndex = (currentPlayerIndex + gameState.direction + players.length) % players.length;
    
    // Skip over players who are qualified
    while (players[nextPlayerIndex].qualified) {
      nextPlayerIndex = (nextPlayerIndex + gameState.direction + players.length) % players.length;
    }
    
    return nextPlayerIndex;
  }