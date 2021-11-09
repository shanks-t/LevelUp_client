import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { updateEvent } from "./EventManager"
import { getGames } from "../game/GameManager"


export const EventUpdateForm = ( {eventToUpdate, setShowUpdateForm}) => {
    const history = useHistory()
    const [ updatedEventState, setUpdatedEventState ] = useState({})
    const [ games, setGames ] = useState([])

    
    useEffect(() => {
        getGames().then(gameData => setGames(gameData))
    }, [])


    useEffect(() => {
        console.log("games", games)
        console.log('eventToUpdate', eventToUpdate)
        console.log('updatedEvent', updatedEventState)

    }, [games,  eventToUpdate, updatedEventState])


    const handleOnChange = (event) => {
        const copyEvent = {...eventToUpdate}
        copyEvent[event.target.name] = event.target.value
        setUpdatedEventState(copyEvent)
    }

    const submitEvent = (event) => {
        event.preventDefault()

        updateEvent(updatedEventState).then(() => { 
            setShowUpdateForm(false)
        })
    }


    return (
        <form className="eventForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        // value={ eventToUpdate.game.title }
                        defaultValue={eventToUpdate?.game.title}
                        onChange={ handleOnChange }>
                        <option value='0'>Select a game...</option>
                        {
                            games.map((game) => 
                                (
                                    game.id === eventToUpdate.game.id ?
                                    <option selected value={game.id}>{game.title}</option>
                                    : <option value={game.id}>{game.title}</option>
                                )
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        defaultValue={eventToUpdate.description}
                        placeholder={eventToUpdate?.description}
                        onChange={handleOnChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        defaultValue={eventToUpdate.date}
                        onChange={handleOnChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        defaultValue={eventToUpdate.time}
                        onChange={handleOnChange}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={submitEvent}
                className="btn btn-primary">Update Event</button>
                <button
                onClick={()=>showForm(false)}>cancel</button>
        </form>
    )   
}
