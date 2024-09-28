export const suits = ["hearts", "diamonds", "clubs", "spades"];
export const values = [
    "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"
];
export const specialCards = ["7", "A", "J", "joker"];
export const jokers = [
    { value: "joker", color: "black" },
    { value: "joker", color: "red" }
];

export function createDeck() {
    const deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit });
        }
    }

    deck.push(...jokers);

    return shuffleDeck(deck);
}

export function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

export function dealCards(deck, numberOfPlayers) {
    const players = Array(numberOfPlayers)
        .fill(null)
        .map(() => ({
            hand: [],
            qualified: false
        }));
    
    for (let i = 0; i < 4; i++) {
        for (let player of players) {
            player.hand.push(deck.pop());
        }
    }

    let middleCard = deck.pop();
    while (specialCards.includes(middleCard.value)) {
        deck.unshift(middleCard);
        middleCard = deck.pop();
    }

    return { deck, players, middleCard };
}

export function printCard(card) {
    if (card.value === "joker") {
      return `${card.color} ${card.value}`;
    } else {
      return `${card.value} of ${card.suit}`;
    }
}

export function initializeGameState(numberOfPlayers) {
    const deck = createDeck();
    const { deck: newDeck, players, middleCard } = dealCards(deck, numberOfPlayers);
    return {
      deck: newDeck,
      oldDeck: [],
      players: players.map((player) => ({ ...player, qualified: false })), // Initialize players with qualified
      middleCard,
      currentPlayerIndex: 0,
      direction: 1,
    };
  }

  export function findNextPlayer(currentPlayerIndex, players) {
    let nextPlayerIndex = (currentPlayerIndex + 1 + players.length) % players.length;
    
    // Skip over players who are qualified
    while (players[nextPlayerIndex].qualified) {
      nextPlayerIndex = (nextPlayerIndex + 1 + players.length) % players.length;
    }
    
    return nextPlayerIndex;
  }