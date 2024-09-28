import React, { useEffect, useState } from 'react'
import Card from './components/Card'

const App = () => {

  const images = [
    {"src:" : "ben.png", "name": "ben10"},
    {"src:" : "doremon.jpg", "name": "doremon"},
    {"src:" : "duck.jpeg", "name": "duck"},
    {"src:" : "hattori.jpg", "name": "hattori"},    
    {"src:" : "jack.png", "name": "jack"},
    {"src:" : "jerry.png", "name": "jerry"},
    {"src:" : "oggy.jpeg", "name": "oggy"},
    {"src:" : "peter.png", "name": "peter"},
    {"src:" : "popeya.jpeg", "name": "popeya"},
    {"src:" : "scoobydoo.jpeg", "name": "scoobydoo"},
    {"src:" : "sinchan.jpg", "name": "sinchan"},
    {"src:" : "sisimaru.jpeg", "name": "sisimaru"},
    {"src:" : "sizuka.jpg", "name": "sizuka"},
    {"src:" : "spike.png", "name": "spike"},
    {"src:" : "tom.png", "name": "tom"}
  ]

  const [displayCards,setDisplayCards] = useState([])
  const [firstCard,setFirstCard] = useState(null)
  const [secondCard,setSecondCard] = useState(null)

  
  const shuffleCards = ()=>{
    const tempShuffledCards = [...images,...images].sort(()=> Math.random()-0.5).map((card)=> ({...card,"id": Math.random()}))
    setDisplayCards(tempShuffledCards)
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
  }
  
  useEffect(()=>{
    if(firstCard && secondCard){
      if(firstCard.name === secondCard.name){
        console.log("matched")
      }
      else{
        console.log("mismatched")
      }
      resetCardChoie()
    }
  },[firstCard, secondCard])
  
  
  
  return (
    <>
      <div>
        <button onClick={startGame}>Start</button>
        <br /><br />

        {displayCards.map((card)=>{
          return <Card card={card} handleClick={handleClick} key={card.id} />
          })}
      </div>
    </>
  )
}

export default App