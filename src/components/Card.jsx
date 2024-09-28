import React from 'react'
import './Card.css'

const Card = ({card:cardDetails, handleClick}) => {

    const handleChoice = ()=>{
        handleClick(cardDetails)
    }

    return (
      <div>
          <img 
            src={`./image/cartoon/${cardDetails["src:"]}`} 
            alt={cardDetails.name}  
            className='card front-side' />

          <img 
            src="./image/cover/cover.jpeg" 
            alt="cover" 
            className='card back-side'
            onClick={handleChoice} />
      </div>
    )
}

export default Card