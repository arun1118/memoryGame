import React, { createContext, useState } from 'react'
import cardCategoryList from "../constants/cardCategoryList.js"
import difficultyLevelsList from '../constants/difficultyLevel.js'
import cardCoverList from '../constants/cardCoverList.js'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = ({setGameDetails}) => {

    const navigate = useNavigate();

    const [backgroundImage, setBackgroundImage] = useState("./image/background/home-background1.jpeg")
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

    const handleChangeBackground = ()=>{
        const randomImageNumber = Math.floor(Math.random() * 7) + 1;
        var backgroundImageUrl = `./image/background/home-background${randomImageNumber}.jpeg`
        setBackgroundImage(backgroundImageUrl);
    }


    return (
      <div id="parent-container" style={{backgroundImage: `url(${backgroundImage})`}}>
        <form id="form-container" onSubmit={handleSubmit}>
            <div id="form-input-field-container">

                <div id="player-name-field-container">
                    <input type="text" id="firstPlayerInput" name="firstPlayer" onChange={(e)=> setFirstPlayer(e.target.value)} value={firstPlayer}/>
                    <input type="text" id="secondPlayerInput" name="secondPlayer" onChange={(e)=> setSecondPlayer(e.target.value)} value={secondPlayer}/>
                </div>

                <div className="card-selector-side-scroll-container">
                    {Object.entries(cardCategoryList).map(([carCategoryKey,cardCategoryValue])=>{
                        return <div className="card-image-container" key={carCategoryKey}>
                            <img 
                                src={`./image/cardTemplate/${cardCategoryValue}.jpeg`} 
                                alt={`card-category-${cardCategoryValue}`} 
                                onClick={()=> handleCardCategorySelection(carCategoryKey)} 
                                className={(cardCategory === carCategoryKey) ? 'choosen-card' : ''} />
                        </div>
                    })}
                </div>

                <div className="card-selector-side-scroll-container">
                    {Object.entries(cardCoverList).map(([cardCoverKey,cardCoverValue])=>{
                        return <div className="card-image-container"  key={cardCoverKey} > 
                            <img 
                                src={`./image/cover/${cardCoverValue}.jpeg`} 
                                alt={`card-cover-${cardCoverValue}`} 
                                onClick={()=> handleCardCoverSelection(cardCoverKey)} 
                                className={(cardCover === cardCoverKey) ? 'choosen-card' : ''} />
                        </div>
                    })}
                </div>

                <div id="difficulty-level-container">
                    {Object.keys(difficultyLevelsList).map(difficultyLevelKey=>{
                        return <div key={difficultyLevelKey} className="difficulty-level-label">
                            <input 
                                type="radio" 
                                id={`difficulty-level-option-${difficultyLevelKey}`} 
                                name="difficultyLevelinput"
                                value={difficultyLevelKey} 
                                onChange={()=> handleDifficultyLevelSelection(difficultyLevelKey)} />
                            <label htmlFor={`difficulty-level-option-${difficultyLevelKey}`}>{difficultyLevelKey}</label>
                        </div>
                    })}
                </div>
            </div>

            <div id="play-backgroundchange-button-container">
                <div id="play-button-container">
                    <input type="submit" value="Play" />
                </div>
                <div id="backgroundchange-button-container">
                    <button type="button" onClick={handleChangeBackground} id="background-change-button">
                        <img src="./image/asset/gallery.png" alt="change" />
                    </button>
                </div>
            </div>

        </form>
      </div>
    )
}

export default Home