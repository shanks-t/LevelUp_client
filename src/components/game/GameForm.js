import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [ game, setGameState] = useState({})

    useEffect(() => {
        getGameTypes().then(gameTypeData => setGameTypes(gameTypeData))
    }, [])



    const handleOnChange = (event) => {
        const copyGame = {...game}
        copyGame[event.target.name] = event.target.value
        setGameState(copyGame)
    }

    const saveGame = (event) => {
        event.preventDefault()

        createGame(game).then(() => { 
            history.push('/games')
        })
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" onChange={(event) => handleOnChange(event)}></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Maker: </label>
                    <input type="text" name="maker" onChange={(event) => handleOnChange(event)}></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" onChange={(event) => handleOnChange(event)}></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Skill Level: </label>
                    <input type="number" name="skillLevel" onChange={(event) => handleOnChange(event)}></input>
                </div>
            </fieldset>
                <label>Game Type</label>
                <select name ="gameTypeId" onChange={(event) => handleOnChange(event)}>
                <option value='0' >Select a game</option>
                    {
                        gameTypes.map(type =>  <option value={type.id}>{type.label}</option>)
                    }
                    </select>
            <button type="submit"
                onClick={saveGame}
                className="btn btn-primary">Save Game</button>
        </form>
    )
}
