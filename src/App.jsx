import { useEffect, useState } from "react";

function App() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(true);

  const buildDeck = () => {
    const deck = [];
    const suits = ["clubs", "spades", "diamonds", "hearts"];
    const values = [
      "ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "jack",
      "queen",
      "king",
    ];
    suits.forEach((suit) => {
      values.forEach((value) => deck.push(`${suit}_${value}`));
    });
    for (let i = 0; i < deck.length; i++) {
      let randInt = Math.floor(Math.random() * deck.length);
      if (i != randInt) {
        const heldCard = deck[i];
        deck[i] = deck[randInt];
        deck[randInt] = heldCard;
      }
    }
    return deck;
  };
  
  const calculateTotal = (hand) => {
    let total = 0;
    let aces = 0;
    for (let i = 0; i < hand.length; i++) {
      const cardValue = hand[i].split("_")[1];
      if (!isNaN(cardValue)) {
        total += parseInt(cardValue);
      } else if (cardValue == "ace") {
        aces++;
        total += 11;
      } else {
        total += 10;
      }
    }
    while (aces > 0 && total > 21) {
      total -= 10;
      aces--;
    }
    return total;
  };

  const startGame = (deck) => {
    setPlayerHand([deck.pop(), deck.pop()]);
    setDealerHand([deck.pop(), deck.pop()]);
    setDeck(deck);
  };

  const dealerTurn = () => {
    let dealerScore = calculateTotal(dealerHand);
    let currentDeck = [...deck];

    while (dealerScore < 17) {
      const newCard = currentDeck.pop();
      setDealerHand([...dealerHand, newCard]);
      setDeck(currentDeck);
      dealerScore = calculateTotal([...dealerHand, newCard]);
    }
    setGameOver(true);
  };

  const hit = () => {
    if (!gameOver && playerTurn) {
      const currentDeck = [...deck];
      const newCard = currentDeck.pop();
      setPlayerHand([...playerHand, newCard]);
      setDeck(currentDeck);

      if (calculateTotal([...playerHand, newCard]) > 21) {
        setGameOver(true);
        setPlayerTurn(false);
      }
    }
  };

  const stand = () => {
    if (!gameOver && playerTurn) {
      setPlayerTurn(false);
      dealerTurn();
    }
  };

  const resetGame = () => {
    const newDeck = buildDeck();
    setDeck(newDeck);
    setGameOver(false);
    setPlayerTurn(true);
    startGame(newDeck);
  };

  useEffect(() => {
    const newDeck = buildDeck();
    setDeck(newDeck);
    startGame(newDeck);
  }, []);

  return (
    <div className="app">
      <h1>Blackjack</h1>
        {gameOver ? (
      <div className="game-over">
            <button onClick={resetGame}>Play Again</button>
            <h3>
              {calculateTotal(playerHand) > 21 ? "You're Bust!" : "Game Over!"}
            </h3>
            <h4>
              {calculateTotal(playerHand) > 21
                ? "Dealer wins!"
                : calculateTotal(playerHand) > calculateTotal(dealerHand)
                ? "You win!"
                : "Dealer wins!"}
            </h4>
      </div>
        ) : null}
      <div className="game-container">
        <div className="cards-container">
          <h2>Dealer</h2>
          {dealerHand.map((card) => (
            <div key={card} className="card">
              <img src={`../assets/fronts/${card}.svg`} alt={card}/>
            </div>
          ))}
          <div className="total">Total: {calculateTotal(dealerHand)}</div>
        </div>
        <div className="cards-container">
          <h2>Player</h2>
          {playerHand.map((card, index) => (
            <div key={index} className="card">
              <img src={`../assets/fronts/${card}.svg`} alt={card}/>
            </div>
          ))}
          <div className="total">Total: {calculateTotal(playerHand)}</div>
        </div>

        {playerTurn && !gameOver && (
      <div className="actions">
            <button onClick={hit}>Hit</button>
            <button onClick={stand}>Stand</button>
        </div>
        )}

      </div>
    </div>
  );
}

export default App;
