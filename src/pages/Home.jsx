import React, { createContext, useState } from 'react'
import cardCategoryList from "../constants/cardCategoryList.js"
import difficultyLevelsList from '../constants/difficultyLevel.js'
import cardCoverList from '../constants/cardCoverList.js'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = ({setGameDetails}) => {

    const navigate = useNavigate();

    const [firstPlayer, setFirstPlayer] = useState("Ben")
    const [secondPlayer, setSecondPlayer] = useState("Gwen")
    const [cardCategory, setCardCategory] = useState("")
    const [difficultyLevel, setDifficultyLevel] = useState("")
    const [cardCover, setCardCover] = useState("")

    const handleCardCategorySelection = (cardCategorySelected)=>{
        setCardCategory(cardCategorySelected)
    }

    const handleCardCoverSelection = (cardSelected)=>{
        setCardCover(cardSelected)
    }

    const handleDifficultyLevelSelection = (difficultyLevelSelected)=>{
        setDifficultyLevel(difficultyLevelSelected)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        let details={
                    "firstPlayer": firstPlayer, 
                    "secondPlayer": secondPlayer, 
                    "cardCategory": cardCategory, 
                    "difficultyLevel": difficultyLevel,
                    "cardCover": cardCover }
        setGameDetails(details);
        navigate("/game");
    }


    return (
      <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstPlayerInput">First Player :</label>
            <input type="text" id="firstPlayerInput" name="firstPlayer" onChange={(e)=> setFirstPlayer(e.target.value)} value={firstPlayer}/>
            <br />

            <label htmlFor="secondPlayerInput">Second Player :</label>
            <input type="text" id="secondPlayerInput" name="secondPlayer" onChange={(e)=> setSecondPlayer(e.target.value)} value={secondPlayer}/>
            <br />

            <p>choose the card category :</p>
            {Object.entries(cardCategoryList).map(([carCategoryKey,cardCategoryValue])=>{
                return <img 
                            key={carCategoryKey}
                            style={{width : "100px", height: "125px"}} 
                            src={`./image/cardTemplate/${cardCategoryValue}.jpeg`} 
                            alt={`card-category-${cardCategoryValue}`} 
                            onClick={()=> handleCardCategorySelection(carCategoryKey)} 
                            className={(cardCategory === carCategoryKey) ? 'choosen-card' : ''} />
            })}
            <br />

            <p>choose the diffuculty level</p>
            {Object.keys(difficultyLevelsList).map(difficultyLevelKey=>{
                return <div key={difficultyLevelKey}>
                    <input 
                        type="radio" 
                        id={`difficulty-level-option-${difficultyLevelKey}`} 
                        name="difficultyLevelInput" 
                        value={difficultyLevelKey} 
                        onChange={()=> handleDifficultyLevelSelection(difficultyLevelKey)} />
                    <label htmlFor={`difficulty-level-option-${difficultyLevelKey}`}>{difficultyLevelKey}</label>
                </div>
            })}

            <p>choose the card cover :</p>
            {Object.entries(cardCoverList).map(([cardCoverKey,cardCoverValue])=>{
                return <img 
                            key={cardCoverKey}
                            style={{width : "100px", height: "125px"}} 
                            src={`./image/cover/${cardCoverValue}.jpeg`} 
                            alt={`card-cover-${cardCoverValue}`} 
                            onClick={()=> handleCardCoverSelection(cardCoverKey)} 
                            className={(cardCover === cardCoverKey) ? 'choosen-card' : ''} />
            })}
            <br />

            <input type="submit" value="Play" />
        </form>
      </div>
    )
}

export default Home