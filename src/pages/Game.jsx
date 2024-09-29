import React, { useEffect, useState } from 'react'
import Card from "../components/Card.jsx"
import { Link } from 'react-router-dom'
import imageSources from "../constants/sources.js"
import cardCategoryList from '../constants/cardCategoryList.js'
import difficultyLevelsList from '../constants/difficultyLevel.js'
import cardCoverList from '../constants/coverList.js'

const Game = ({gameDetails}) => {

      const [displayCards,setDisplayCards] = useState([])
      const [firstCard,setFirstCard] = useState(null)
      const [secondCard,setSecondCard] = useState(null)
      const [flipDisable,setFlipDisable] = useState(false)
      const [turn,setTurn] = useState(1)
      const [score,setScore] = useState({[gameDetails.firstPlayer]: 0, [gameDetails.secondPlayer]: 0})
      const [cardsLeft,setCardsLeft] = useState(difficultyLevelsList[gameDetails.difficultyLevel])

      const shuffleCards = ()=>{
        let imageDirName = cardCategoryList[gameDetails.cardCategory]
        let noOfCards = difficultyLevelsList[gameDetails.difficultyLevel]
        const allImages = imageSources[imageDirName]
        const images = allImages.sort(()=> Math.random()-0.5).slice(0,noOfCards)
        const tempShuffledCards = [...images,...images].sort(()=> Math.random()-0.5).map((card)=> ({...card,"id": Math.random()}))
        setDisplayCards(tempShuffledCards)
        setFirstCard(null)
        setSecondCard(null)
        setScore({[gameDetails.firstPlayer]: 0, [gameDetails.secondPlayer]: 0})
        setCardsLeft(difficultyLevelsList[gameDetails.difficultyLevel])
        setTurn(Math.floor(Math.random()*2)+1)
      }
      
      const startGame = ()=>{
        shuffleCards();
      }
      
      const handleClick = (currentCard)=>{
        (!firstCard) ? setFirstCard(currentCard) : setSecondCard(currentCard)
      }
    
      const resetCardChoie = ()=>{
        setFirstCard(null)
        setSecondCard(null)
        setFlipDisable(false)
      }

      useEffect(()=>{
        startGame()
      },[])
      
      useEffect(()=>{
        if(firstCard && secondCard){
          setFlipDisable(true)
          if(firstCard.name === secondCard.name){
            setDisplayCards((prevCards)=>{
              return prevCards.map((currentCard)=>{
                if(currentCard.name === firstCard.name){
                  return {...currentCard, "matched": true}
                }
                else return currentCard
              })
            })
            setCardsLeft((prevValue)=> prevValue-1)
            resetCardChoie()
            setScore((prevValue)=>{
              if(turn&1) return {...prevValue, [gameDetails.firstPlayer]: prevValue[gameDetails.firstPlayer]+1}
              else return {...prevValue, [gameDetails.secondPlayer]: prevValue[gameDetails.secondPlayer]+1}
            })
          }
          else{
            setTimeout(()=> {
                resetCardChoie();
                setTurn((prevValue)=> (prevValue&1)?2:1)}, 1000) 
            
          }
        }
      },[firstCard, secondCard])

    return (
      <>
        <Link to="/">Home</Link>
        <p>player 1 : {gameDetails.firstPlayer}</p>
        <p>player 2 : {gameDetails.secondPlayer}</p>
        <p>card category : {gameDetails.cardCategory}</p>
        <p>difficulty level : {gameDetails.difficultyLevel}</p>
        <p>cards left : {cardsLeft}</p>
        <h2 style={{display: (cardsLeft===0)? "block" : "none"}}>
            winner is &nbsp;
            {(score[gameDetails.firstPlayer] > score[gameDetails.secondPlayer]) ? gameDetails.firstPlayer : gameDetails.secondPlayer}
        </h2>
        <div style={{backgroundColor : (turn&1)? "red" : "blue" }}>
            <p style={{color: "white"}}>turn : {(turn&1) ? gameDetails.firstPlayer : gameDetails.secondPlayer}</p>
            <p style={{color: "white"}}>
                {gameDetails.firstPlayer} : {score[gameDetails.firstPlayer]}
                &nbsp; &nbsp; &nbsp; &nbsp; 
                {gameDetails.secondPlayer} : {score[gameDetails.secondPlayer]}
            </p>
            <button onClick={startGame}>Start</button>
            <br /><br />
            <div style={{display: "flex", flexWrap: "wrap"}}>
            {displayCards.map((card)=>{
                return <Card 
                card={card} 
                handleClick={handleClick} 
                key={card.id} 
                isFlip={card === firstCard || card === secondCard || card.matched} 
                flipDisable={flipDisable}
                cardCategory={cardCategoryList[gameDetails.cardCategory]}
                cardCover={cardCoverList[gameDetails.cardCover]} />
            })}
            </div>
        </div>
      </>
    )
}

export default Game