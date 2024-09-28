import { useGameState } from "../context/gameStateContext.jsx";

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