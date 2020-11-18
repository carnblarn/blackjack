import React from 'react';
import { Card } from '../api/types';

const CardComponent: React.FC<{ card: Card }> = ({ card }) => {
    return (
        <img className="card fade-in" alt={card.code} src={card.image}></img>
    );
};

export default CardComponent;
