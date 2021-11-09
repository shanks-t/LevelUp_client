import React, { useState, useEffect } from "react"
import { updateGame, getGameTypes, getGames } from "./GameManager"


export const GameUpdateForm = ( {gameToUpdate, setShowUpdateForm}) => {
    const [ updatedGameState, setUpdatedGameState ] = useState({})
    const [ games, setGames ] = useState([])
    const [gameTypes, setGameTypes] = useState([])


    
    useEffect(() => {
        getGameTypes().then(gameTypeData => setGameTypes(gameTypeData))
    }, [])

    useEffect(() => {
        console.log('gameToUpdate', gameToUpdate)
        console.log('updatedGame', updatedGameState)

    }, [ gameToUpdate, updatedGameState])


    const handleOnChange = (event) => {
        const copyGame = {...gameToUpdate}
        copyGame[event.target.name] = event.target.value
        setUpdatedGameState(copyGame)
    }

    const submitGame = (event) => {
        event.preventDefault()

        updateGame(updatedGameState).then(() => { 
            setShowUpdateForm(false)
        })
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" 
                    defaultValue={gameToUpdate.title}
                    onChange={handleOnChange}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Maker: </label>
                    <input type="text" name="maker" 
                    defaultValue={gameToUpdate.maker}
                    onChange={handleOnChange}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" 
                    defaultValue={gameToUpdate.numberOfPlayers}
                    onChange={handleOnChange}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Skill Level: </label>
                    <input type="number" name="skillLevel" 
                    defaultValue={gameToUpdate.skillLevel}
                    onChange={handleOnChange}/>
                </div>
            </fieldset>
                <label>Game Type</label>
                <select name ="gameTypeId" 
                defaultValue={gameToUpdate.gameTypeId}
                onChange={handleOnChange}>
                <option value='0' >Select a game</option>
                    {
                        gameTypes.map(type =>  
                            (
                            type.id === gameToUpdate.gameTypeId ? 
                            <option selected value={type.id}>{type.label}</option>
                            : <option value={type.id}>{type.label}</option>
                            )
                        )
                    }
                    </select>
            <button type="submit"
                onClick={submitGame}
                className="btn btn-primary">Save Game</button>
            <button
            onClick={()=>setShowUpdateForm(false)}>cancel</button>
        </form>
    )
}
