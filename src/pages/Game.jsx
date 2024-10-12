import React, { useEffect, useState } from 'react'
import Card from "../components/Card.jsx"
import { Link } from 'react-router-dom'
import imageSources from "../constants/sources.js"
import cardCategoryList from '../constants/cardCategoryList.js'
import difficultyLevelsList from '../constants/difficultyLevel.js'
import cardCoverList from '../constants/cardCoverList.js'
import './Game.css'

const Game = ({gameDetails}) => {

      const [displayCards,setDisplayCards] = useState([])
      const [firstCard,setFirstCard] = useState(null)
      const [secondCard,setSecondCard] = useState(null)
      const [flipDisable,setFlipDisable] = useState(false)
      const [turn,setTurn] = useState(2)
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
      <div id="parent-container" style={{backgroundImage: "url(./image/background/game-background.jpeg)"}}>

        <div id="home-button-container">
          <button>
            <Link to="/">
              <img src="./image/asset/home-icon.png" alt="home" className="game-buttons" />
            </Link>
          </button>
          <p className='score-turn-detail'>Score : {score[gameDetails.firstPlayer]} &nbsp; &nbsp; {(turn&1) ? `${gameDetails.firstPlayer}'s turn` : ""}</p>
        </div>

        <div id="play-area" className={(cardsLeft===0)? "winner-background" : (turn&1)? "first-player-background" : "second-player-background"}>
          {
            (cardsLeft===0)
            ?
            <div id="winner-background">
              <h2 id="winner-header">
                winner is &nbsp;
                {(score[gameDetails.firstPlayer] > score[gameDetails.secondPlayer]) ? gameDetails.firstPlayer : gameDetails.secondPlayer}
                🎉🥳
              </h2>
            </div>
            :
            <div id="card-parent-container">
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
          }
          
        </div>
        
        <div id="restart-button-container">
          <p className='score-turn-detail'> Score : {score[gameDetails.secondPlayer]} &nbsp; &nbsp; {(turn&1) ? "" : `${gameDetails.secondPlayer}'s turn`}</p>
          <button onClick={startGame}>
            <img src="./image/asset/restart-icon.png" alt="home" className="game-buttons" />
          </button>
        </div>

      </div>
    )
}

export default Game