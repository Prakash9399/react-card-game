import React, { useState, useEffect } from 'react';
import ShowCard from './ShowCard';
import './Level.css';

const Level = ({ images, mode }) => {

    // Cards rendered on screen
    const [cards, setCards] = useState([]);
    // Store first choice of the user
    const [firstChoice, setFirstChoice] = useState(null);
    // Store second choice of the user
    const [secondChoice, setSecondchoice] = useState(null);
    // Count the number of turns taken by the user
    const [turnCounter, setTurnCounter] = useState(0);
    // Dont allow clicks after 2 wrong card flips
    const [allowClick, setAllowClick] = useState(true);

    // Invoke handleClick when user clicks on a card
    const handleClick = (card) => {
        // Set the first and second choices of the user
        if (firstChoice === null) {
            setFirstChoice(card);
        } else {
            setSecondchoice(card);
        }
    }

    // Invoke only when first or second choice change
    // To avoid infinite re renders dont invoke when allowClick state changes
    useEffect(() => {
        // If first and second choice both exist
        if (firstChoice && secondChoice) {
            // If user clicked on same images then reset choices, increase turn by 1
            // and set the 'matched' property of both images to true
            // Notice that "images" prop is not being changed
            if (firstChoice.source === secondChoice.source) {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.source === firstChoice.source) {
                            return { ...card, matched: true }
                        } else {
                            return card;
                        }
                    })
                })
                setFirstChoice(null);
                setSecondchoice(null);
                setTurnCounter((prevTurnCounter => prevTurnCounter + 1));
            }
            // if user clicked on different images then reset choices, increase turn by 1
            // and dont allow extra clicks for 800 miliseconds
            else {
                setAllowClick(false);
                setTimeout(() => {
                    setFirstChoice(null);
                    setSecondchoice(null);
                    setAllowClick(true);
                    setTurnCounter((prevTurnCounter => prevTurnCounter + 1));
                }, 800);
            }
        }
    }, [firstChoice, secondChoice]);

    // Start new game when user clicks on the New Game button
    const newGame = () => {
        // Shuffling cards using Fisher-Yates shuffle algorithm.
        // The idea is to walk the array in the reverse order and 
        // swap each element with a random one before it:
        const shuffledCards = [...images];
        for (var i = shuffledCards.length - 1; i > 0; i--) {
            // Generate a random index in [0,i]
            let index = Math.floor(Math.random() * (i + 1));
            // swap arr[i] with the arr[index]
            [shuffledCards[i], shuffledCards[index]] = [shuffledCards[index], shuffledCards[i]];
        }
        setCards(shuffledCards);
        setFirstChoice(null);
        setSecondchoice(null);
        setTurnCounter(0);
    }

    // By default cards will be shuffled when the game starts
    useEffect(() => {
        newGame();
    }, [])

    // For the game to be completed successfully, the matched property of all the
    // elements (objects) in cards (array of objects) must be true
    // When user completes the game successfully we set result to true
    var result = false, count = 0;
    for (const card of cards) {
        if (card['matched'] === true) {
            count++;
        }
    }
    if (count === cards.length) result = true;

    return (
        <div className="level-content">
            <div className={`${mode}-level-grid`}>
                {cards.map((card) => (
                    <ShowCard
                        key={card.id}
                        // isFlipped will be true when:
                        // 1) first choice is equal to current card
                        // 2) second choice is equal to current card
                        // 3) matched property of current card is true
                        isFlipped={card === firstChoice || card === secondChoice || card.matched}
                        handleClick={handleClick}
                        card={card}
                        allowClick={allowClick}
                    />
                ))}
            </div>
            <div className="level-content-child">
                <div className="turn-counter">Turn: {turnCounter}</div>
                <button className="new-game-button" onClick={newGame}>New Game</button>
                {/* Show Congratulations! only when result is true */}
                {result && <div className="congratulations">Congratulations!</div>}
            </div>
        </div>
    )
};

export default Level;