import { generateCards } from '../testing/utils';
import { calculatePoints, calculateWinner } from './scoring';

test('scores basic hand', () => {
    const hand = generateCards(['2', '4', '6']);
    const score = calculatePoints(hand);
    expect(score).toEqual(12);
});

test('scores face card hand', () => {
    const hand = generateCards(['2', '4', 'KING']);
    const score = calculatePoints(hand);
    expect(score).toEqual(16);
});

test('scores hand with ace high', () => {
    const hand = generateCards(['2', '4', 'ACE']);
    const score = calculatePoints(hand);
    expect(score).toEqual(17);
});

test('scores hand with ace low', () => {
    const hand = generateCards(['JACK', 'QUEEN', 'ACE']);
    const score = calculatePoints(hand);
    expect(score).toEqual(21);
});

test('end game player wins', () => {
    const playerHand = generateCards(['JACK', 'ACE']);
    const houseHand = generateCards(['JACK', 'KING']);
    const winner = calculateWinner(playerHand, houseHand);
    expect(winner).toEqual('PLAYER');
});

test('end game player loses', () => {
    const playerHand = generateCards(['JACK', 'ACE', 'QUEEN', '2']);
    const houseHand = generateCards(['JACK', 'KING']);
    const winner = calculateWinner(playerHand, houseHand);
    expect(winner).toEqual('HOUSE');
});

test('end game player loses on tie', () => {
    const playerHand = generateCards(['JACK', 'KING']);
    const houseHand = generateCards(['JACK', 'KING']);
    const winner = calculateWinner(playerHand, houseHand);
    expect(winner).toEqual('HOUSE');
});
