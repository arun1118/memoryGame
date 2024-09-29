import React from 'react'
import './Card.css'

const Card = ({card:cardDetails, handleClick, isFlip, flipDisable, cardCategory, cardCover}) => {

    const handleChoice = ()=>{
        if(!flipDisable) handleClick(cardDetails)
    }

    return (
      <div className='card'>
        <div className={isFlip ? 'card-flip': ''}>
          <img 
            src={`./image/${cardCategory}/${cardDetails["src:"]}`} 
            alt={cardDetails.name}  
            className='front-side' />
          <img 
            src={`./image/cover/${cardCover}.jpeg`}
            alt="cover" 
            className='back-side'
            onClick={handleChoice} />
        </div>
      </div>
    )
}

export default Card