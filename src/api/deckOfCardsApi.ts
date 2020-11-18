import axios from 'axios';
import { Card } from './types';

type BaseResponse = {
    success: boolean;
    deck_id: string;
    remaining: number;
};

export const createDeck = (): Promise<BaseResponse> => {
    return axios
        .get(`https://deckofcardsapi.com/api/deck/new/`)
        .then(({ data }) => {
            return data;
        });
};

export const shuffleNewDeck = (): Promise<BaseResponse> => {
    return axios
        .get(`https://deckofcardsapi.com/api/deck/new/shuffle/`, {
            params: {
                deck_count: 1,
            },
        })
        .then(({ data }) => {
            return data;
        });
};

export const reshuffleDeck = (deckId: string): Promise<BaseResponse> => {
    return axios
        .get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`, {
            params: {
                deck_count: 1,
            },
        })
        .then(({ data }) => {
            return data;
        });
};

export const drawCards = (
    deckId: string,
    count: number
): Promise<BaseResponse & { cards: Card[] }> => {
    return axios
        .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`, {
            params: {
                count,
            },
        })
        .then(({ data }) => {
            return data;
        });
};
