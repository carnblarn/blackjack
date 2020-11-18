import { Card } from '../api/types';

export const generateCards = (values: string[]): Card[] => {
    return values.map((value) => {
        return {
            value,
            code: 'unknown',
            image: 'unknown',
            suit: 'SPADES',
        };
    });
};
