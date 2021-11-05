import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getEvents, joinEvent, deleteEvent, leaveEvent } from "./EventManager.js"

export const EventList = (props) => {
    const [ events, updateEvents ] = useState([])
    const history = useHistory()


    const eventFetcher = () => {
        getEvents().then(data => updateEvents(data))
    }

    useEffect(() => {
        eventFetcher()
    }, [])

    useEffect(() => {
        console.log('events', events)
    }, [events])


    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push("/events/new")
                }}>Create A New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.organizer.user.first_name}</div>
                        <div className="event__description">{event.description} </div> 
                        <button className='delete-btn'
                        onClick={
                            () => { 
                                deleteEvent(event.id)
                                    .then(()=> eventFetcher())}}>delete event
                                </button>
                        <div className="event__skillLevel">{event.date} @ {event.time}</div>
                        {
                            event.joined
                                ? <button className="btn btn-3"
                                    onClick={() => leaveEvent(event.id).then(() => eventFetcher())}
                                    >Leave</button>
                                : <button className="btn btn-2"
                                    onClick={() => joinEvent(event.id).then(() => eventFetcher())}
                                    >Join</button>
                        }
                    </section>
                })
            }
        </article>
    )
}
