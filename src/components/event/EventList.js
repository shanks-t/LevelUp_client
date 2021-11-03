import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    const getAllEvents = () => {
        getEvents().then(eventData => setEvents(eventData))
    }

    useEffect(() => {
        getAllEvents()
    }, [])


    useEffect(() => {
        console.log('events', events)
    }, [events])


    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.organizer.user.first_name}</div>
                        <div className="event__players">{event.description} </div>
                        <div className="event__skillLevel">{event.date}</div>
                    </section>
                })
            }
        </article>
    )
}
