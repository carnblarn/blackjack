import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import App from './App';
import * as api from './api/deckOfCardsApi';
import { generateCards } from './testing/utils';

jest.mock('./api/deckOfCardsApi');

test('renders title', () => {
    (api.shuffleNewDeck as jest.Mock).mockResolvedValue({
        deck_id: '2',
    });
    (api.drawCards as jest.Mock).mockResolvedValue({
        cards: [],
    });
    render(<App />);
    const titleElement = screen.getByText(/Blackjack/i);
    expect(titleElement).toBeInTheDocument();
});

test('draws 4 cards', async () => {
    (api.shuffleNewDeck as jest.Mock).mockResolvedValue({
        deck_id: '2',
    });
    (api.drawCards as jest.Mock).mockResolvedValue({
        cards: [],
    });
    render(<App />);
    await waitFor(() => expect(api.drawCards).toBeCalledWith('2', 4));
});

test('draws 1 card on hit', async () => {
    (api.shuffleNewDeck as jest.Mock).mockResolvedValue({
        deck_id: '2',
    });
    (api.drawCards as jest.Mock).mockResolvedValue({
        cards: [],
    });
    render(<App />);
    await waitFor(() => expect(api.drawCards).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByText(/Draw Card/i));
    await waitFor(() => expect(api.drawCards).toBeCalledTimes(2));
});

test('declares the player a winner', async () => {
    (api.shuffleNewDeck as jest.Mock).mockResolvedValue({
        deck_id: '2',
    });
    (api.drawCards as jest.Mock).mockResolvedValue({
        cards: generateCards(['ACE', 'KING', 'KING', '5']),
    });
    render(<App />);
    await waitFor(() => expect(api.drawCards).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByText(/Stand/i));
    const message = screen.queryByText(/You Won/i);
    expect(message).toBeInTheDocument();
});
