import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { createEvent } from "./EventManager"
import { getGames } from "../game/GameManager"

export const EventUpdateForm = ( {eventToUpdate}) => {
    const history = useHistory()
    const [ games, setGames ] = useState([])
    const [currentEvent, setCurrentEvent] = useState({
        gameId: 0,
        organizer: localStorage.getItem('lu_token'),
        description: '',
        date: '',
        time: '',
    })

    
    useEffect(() => {
        getGames().then(gameData => setGames(gameData))
    }, [])


    useEffect(() => {
        console.log("games", games)
        console.log('eventState',currentEvent)

    }, [games, currentEvent])


    const changeEventGameState = (domEvent) => {
        const newEventState = {...currentEvent}
        newEventState.gameId = event.target.value
        setCurrentEvent(newEventState)
    }

    const changeEventDescriptionState = (domEvent) => {
        const newEventState = {...currentEvent}
        newEventState.description = event.target.value
        setCurrentEvent(newEventState)
    }
    const changeEventDateState = (domEvent) => {
        const newEventState = {...currentEvent}
        newEventState.date = event.target.value
        setCurrentEvent(newEventState)
    }
    const changeEventTimeState = (domEvent) => {
        const newEventState = {...currentEvent}
        newEventState.time = event.target.value
        setCurrentEvent(newEventState)
    }

    return (
        <form className="eventForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        defaultValue={eventToUpdate}
                        onChange={ changeEventGameState }>
                        <option value='0'>Select a game...</option>
                        {
                            games.map(game => (
                                <option value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventDescriptionState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">date: </label>
                    <input type="date" name="description" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventDateState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventTimeState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        gameId: parseInt(currentEvent.gameId),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                    }
                    createEvent(event)
                    .then(() => history.push('/events'))
                }}
                className="btn btn-primary">Create Event</button>
                but
        </form>
    )   
}
