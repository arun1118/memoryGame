
        <p>player 1 : {gameDetails.firstPlayer}</p>
        <p>player 2 : {gameDetails.secondPlayer}</p>
        <p>card category : {gameDetails.cardCategory}</p>
        <p>difficulty level : {gameDetails.difficultyLevel}</p>
        <p>cards left : {cardsLeft}</p>
        <h2 style={{display: (cardsLeft===0)? "block" : "none"}}>
            winner is &nbsp;
            {(score[gameDetails.firstPlayer] > score[gameDetails.secondPlayer]) ? gameDetails.firstPlayer : gameDetails.secondPlayer}
        </h2>
        <div style={{backgroundColor : (turn&1)? "red" : "blue" }}>
            <p style={{color: "white"}}>turn : {(turn&1) ? gameDetails.firstPlayer : gameDetails.secondPlayer}</p>
            <p style={{color: "white"}}>
                {gameDetails.firstPlayer} : {score[gameDetails.firstPlayer]}
                &nbsp; &nbsp; &nbsp; &nbsp; 
                {gameDetails.secondPlayer} : {score[gameDetails.secondPlayer]}
            </p>
            <button onClick={startGame}>Start</button>
            <br /><br />
            <div style={{display: "flex", flexWrap: "wrap"}}>
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
        </div>