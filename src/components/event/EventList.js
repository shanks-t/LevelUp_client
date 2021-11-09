import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getEvents, joinEvent, deleteEvent, leaveEvent } from "./EventManager.js"
import { EventCreateForm } from "./EventCreateForm.js"
import { EventUpdateForm } from "./EventUpdateForm.js"

export const EventList = (props) => {
    const [ events, updateEvents ] = useState([])
    const [ showUpdateForm, setShowUpdateForm ] = useState(false)
    const [ showCreateForm, setShowCreateForm ] = useState(false)
    const [ eventObjectForUpdate, setEventObjectForUpdate ] = useState([])
    const history = useHistory()


    const eventFetcher = () => {
        getEvents().then(data => updateEvents(data))
    }

    useEffect(() => {
        eventFetcher()
    }, [])

    useEffect(() => {
        console.log('events', events)
        console.log('eventToUpdate', eventObjectForUpdate)
    }, [events, eventObjectForUpdate])

    const handleUpdateFormToggle = () => {
        if(showUpdateForm) {
            setShowUpdateForm(false)
        }else{
            setShowUpdateForm(true)
        }
    }
    const handleCreateFormToggle = () => {
        if(showUpdateForm) {
            setShowCreateForm(false)
        }else{
            setShowCreateForm(true)
        }
    }

    const updateFormJSX =
        <div>
            <EventUpdateForm eventToUpdate={eventObjectForUpdate} setShowUpdateForm={setShowUpdateForm}/>
        </div>
    const createFormJSX =
        <div>
            <EventCreateForm setShowCreateForm={setShowCreateForm}/>
        </div>

    return (
        <>
        {showCreateForm ? createFormJSX
            : (showUpdateForm) ? updateFormJSX
            
            :

            <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    handleCreateFormToggle()
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
                                    .then(()=> eventFetcher())
                                    }}>delete event</button>
                                <button className="btn btn-2 btn-sep icon-create"
                        onClick={
                            () => {
                                handleUpdateFormToggle()
                                setEventObjectForUpdate(event)
                            }}>Update Event</button>
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

        }
    </>
        
    )
}
