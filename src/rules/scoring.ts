import { Card } from '../api/types';

const cardScore = (card: Card, aceHigh: boolean) => {
    const { value } = card;
    if (parseInt(value)) {
        return parseInt(value);
    } else if (value === 'ACE') {
        return aceHigh ? 11 : 1;
    } else if (value === 'KING' || value === 'QUEEN' || value === 'JACK') {
        return 10;
    }
    // a joker perhaps
    throw new Error('invalid card value');
};

export const calculatePoints = (cards: Card[]) => {
    let score = cards.reduce((acc, currentCard) => {
        return acc + cardScore(currentCard, true);
    }, 0);
    if (score > 21) {
        score = cards.reduce((acc, currentCard) => {
            return acc + cardScore(currentCard, false);
        }, 0);
    }
    return score;
};

export const calculateWinner = (
    playerCards: Card[],
    houseCards: Card[]
): 'PLAYER' | 'HOUSE' => {
    const playerScore = calculatePoints(playerCards);
    const houseScore = calculatePoints(houseCards);

    if (playerScore <= 21 && playerScore > houseScore) {
        return 'PLAYER';
    } else {
        return 'HOUSE';
    }
};
