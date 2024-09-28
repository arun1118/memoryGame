import React from 'react'
import './Card.css'

const Card = ({card:cardDetails, handleClick, isFlip}) => {

    const handleChoice = ()=>{
        handleClick(cardDetails)
    }

    return (
      <div className='card'>
        <div className={isFlip ? 'card-flip': ''}>
          <img 
            src={`./image/cartoon/${cardDetails["src:"]}`} 
            alt={cardDetails.name}  
            className='front-side' />
          <img 
            src="./image/cover/cover.jpeg" 
            alt="cover" 
            className='back-side'
            onClick={handleChoice} />
        </div>
      </div>
    )
}

export default Card