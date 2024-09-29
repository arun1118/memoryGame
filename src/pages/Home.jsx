import React, { createContext, useState } from 'react'
import cardCategoryList from "../constants/cardCategoryList.js"
import difficultyLevelsList from '../constants/difficultyLevel.js'
import cardCoverList from '../constants/coverList.js'
import { useNavigate } from 'react-router-dom'

const Home = ({setGameDetails}) => {

    const navigate = useNavigate();

    const [firstPlayer, setFirstPlayer] = useState("Ben")
    const [secondPlayer, setSecondPlayer] = useState("Gwen")
    const [cardCategory, setCardCategory] = useState("")
    const [difficultyLevel, setDifficultyLevel] = useState("")
    const [cardCover, setCardCover] = useState("")

    const handleSelect = (e)=>{
        var key = e.target.value;
        var name = e.target.name;
        if(name === "cardCategory") setCardCategory(key)
        else if (name === "difficultyLevel") setDifficultyLevel(key)
        else if (name === "cardCover") setCardCover(key)
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
            <input type="text" name="firstPlayer" onChange={(e)=> setFirstPlayer(e.target.value)} value={firstPlayer}/>
            <input type="text" name="secondPlayer" onChange={(e)=> setSecondPlayer(e.target.value)} value={secondPlayer}/>
            
            <select name="cardCategory" value={cardCategory} onChange={handleSelect}>
                <option value="">Choose One</option>
            {Object.keys(cardCategoryList).map(key=>{
                return <option value={key} key={key}>{key}</option>
            })}
            </select>
            
            <select name="difficultyLevel" value={difficultyLevel} onChange={handleSelect}>
                <option value="">Choose One</option>
            {Object.keys(difficultyLevelsList).map(key=>{
                return <option value={key} key={key}>{key}</option>
            })}
            </select>

            <select name="cardCover" value={cardCover} onChange={handleSelect}>
                <option value="">Choose One</option>
            {Object.keys(cardCoverList).map(key=>{
                return <option value={key} key={key}>{key}</option>
            })}
            </select>
            
            <input type="submit" value="Play" />
        </form>
      </div>
    )
}

export default Home