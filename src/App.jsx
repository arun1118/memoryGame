import React, { useEffect, useState } from 'react'
import Card from './components/Card'

const App = () => {

  const images = [
    {"src:" : "ben.png", "name": "ben10", "matched": false},
    {"src:" : "doremon.jpg", "name": "doremon", "matched": false},
    {"src:" : "duck.jpeg", "name": "duck", "matched": false},
    {"src:" : "hattori.jpg", "name": "hattori", "matched": false},    
    // {"src:" : "jack.png", "name": "jack", "matched": false},
    // {"src:" : "jerry.png", "name": "jerry", "matched": false},
    // {"src:" : "oggy.jpeg", "name": "oggy", "matched": false},
    // {"src:" : "peter.png", "name": "peter", "matched": false},
    // {"src:" : "popeya.jpeg", "name": "popeya", "matched": false},
    // {"src:" : "scoobydoo.jpeg", "name": "scoobydoo", "matched": false},
    // {"src:" : "sinchan.jpg", "name": "sinchan", "matched": false},
    // {"src:" : "sisimaru.jpeg", "name": "sisimaru", "matched": false},
    // {"src:" : "sizuka.jpg", "name": "sizuka", "matched": false},
    // {"src:" : "spike.png", "name": "spike", "matched": false},
    // {"src:" : "tom.png", "name": "tom", "matched": false}
  ]

  const [displayCards,setDisplayCards] = useState([])
  const [firstCard,setFirstCard] = useState(null)
  const [secondCard,setSecondCard] = useState(null)
  const [flipDisable,setFlipDisable] = useState(false)

  
  const shuffleCards = ()=>{
    const tempShuffledCards = [...images,...images].sort(()=> Math.random()-0.5).map((card)=> ({...card,"id": Math.random()}))
    setDisplayCards(tempShuffledCards)
    setFirstCard(null)
    setSecondCard(null)
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
        resetCardChoie()
      }
      else{
        setTimeout(()=> resetCardChoie(), 1500) 
      }
      
    }
  },[firstCard, secondCard])
  
  
  
  return (
    <>
      <div>
        <button onClick={startGame}>Start</button>
        <br /><br />
        <div style={{display: "flex", flexWrap: "wrap"}}>
          {displayCards.map((card)=>{
            return <Card 
            card={card} 
            handleClick={handleClick} 
            key={card.id} 
            isFlip={card === firstCard || card === secondCard || card.matched} 
            flipDisable={flipDisable} />
          })}
        </div>
      </div>
    </>
  )
}

export default App