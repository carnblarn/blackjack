import React, { useEffect, useState } from 'react';
import { drawCards, shuffleNewDeck, reshuffleDeck } from './api/deckOfCardsApi';
import { Card } from './api/types';
import './App.css';
import CardComponent from './components/Card';
import { calculatePoints, calculateWinner } from './rules/scoring';

function App() {
    const [deckId, setDeckId] = useState<string | undefined>();
    const [playerCards, setPlayerCards] = useState<Card[]>([]);
    const [houseCards, setHouseCards] = useState<Card[]>([]);
    const [winner, setWinner] = useState<'HOUSE' | 'PLAYER' | undefined>();

    useEffect(() => {
        async function fetchData() {
            const deck = await shuffleNewDeck();
            setDeckId(deck.deck_id);
            const cards = (await drawCards(deck.deck_id, 4)).cards;

            setPlayerCards(cards.slice(0, 2));
            setHouseCards(cards.slice(2, 4));
        }
        fetchData();
    }, []);

    const drawCard = () => {
        if (!deckId) {
            return;
        }
        drawCards(deckId, 1).then((cards) => {
            const newCards = [...playerCards, ...cards.cards];
            setPlayerCards(newCards);
            const playerScore = calculatePoints(newCards);
            if (playerScore > 21) {
                setWinner('HOUSE');
            }
        });
    };

    const stand = () => {
        const winner = calculateWinner(playerCards, houseCards);
        setWinner(winner);
    };

    const playAgain = async () => {
        if (!deckId) {
            return;
        }
        await reshuffleDeck(deckId);
        const cards = (await drawCards(deckId, 4)).cards;
        setPlayerCards(cards.slice(0, 2));
        setHouseCards(cards.slice(2, 4));
        setWinner(undefined);
    };

    const playerScore = calculatePoints(playerCards);
    const houseScore = calculatePoints(houseCards);

    return (
        <div className="App">
            <h1>Blackjack</h1>
            {winner && (
                <h3>
                    {winner === 'PLAYER' ? 'You Won!' : 'You lost this one'}
                </h3>
            )}

            <h4>Dealer's Hand</h4>
            <div>
                {houseCards.map((card, i) => {
                    return <CardComponent key={i} card={card} />;
                })}
            </div>
            <p>
                <em>The dealer is showing {houseScore}</em>
            </p>
            <h4>Your Hand</h4>
            <div>
                {playerCards.map((card, i) => {
                    return <CardComponent key={i} card={card} />;
                })}
            </div>
            <p>
                <em>You are showing {playerScore}</em>
            </p>
            {!winner ? (
                <>
                    <button onClick={drawCard}>Draw Card</button>
                    <button onClick={stand}>Stand</button>
                </>
            ) : (
                <button onClick={playAgain}>Play Again</button>
            )}
        </div>
    );
}

export default App;
