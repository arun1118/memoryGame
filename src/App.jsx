import React, {useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'

const App = () => {
  
  const [gameDetails, setGameDetails] = useState({
                                                "firstPlayer": "test", 
                                                "secondPlayer": "", 
                                                "cardCategory": "", 
                                                "difficultyLevel": "" })

    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Home setGameDetails={setGameDetails} />} />
          <Route path="/game" element={<Game gameDetails={gameDetails} />} />
        </Routes>
      </BrowserRouter>
    )
}

export default App