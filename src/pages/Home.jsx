import React, { createContext, useState } from 'react'
import cardCategoryList from "../constants/cardCategoryList.js"
import difficultyLevelsList from '../constants/difficultyLevel.js'
import { useNavigate } from 'react-router-dom'

const Home = ({setGameDetails}) => {

    const navigate = useNavigate();

    const [firstPlayer, setFirstPlayer] = useState("")
    const [secondPlayer, setSecondPlayer] = useState("")
    const [cardCategory, setCardCategory] = useState(cardCategoryList.cartoon)
    const [difficultyLevel, setDifficultyLevel] = useState(difficultyLevelsList.medium)

    const handleSubmit=(e)=>{
        e.preventDefault();

        let details={
                    "firstPlayer": firstPlayer, 
                    "secondPlayer": secondPlayer, 
                    "cardCategory": cardCategory, 
                    "difficultyLevel": difficultyLevel }
        setGameDetails(details);
        navigate("/game");
    }


    return (
      <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstPlayer" onChange={(e)=> setFirstPlayer(e.target.value)} value={firstPlayer}/>
            <input type="text" name="secondPlayer" onChange={(e)=> setSecondPlayer(e.target.value)} value={secondPlayer}/>
            <input type="submit" value="Submit" />
        </form>
      </div>
    )
}

export default Home