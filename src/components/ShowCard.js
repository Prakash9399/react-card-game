import React from 'react'
import './ShowCard.css';
import mystery from '../images/mystery.png';

const ShowCard = ({ card, handleClick, isFlipped, allowClick, cards }) => {
    const clickHandler = () => {
        // handle click only if allowClick is true
        if(allowClick) handleClick(card);
    }
    return (
        <div className="level-grid-child">
            <div className={` ${isFlipped ? "flipped" : ""}`}>
                <img className="front-card" onClick={clickHandler} src={mystery} alt=" front card" />
                <img className="back-card" src={card.source} alt="back card" />
            </div>  
        </div>
    )
}

export default ShowCard;