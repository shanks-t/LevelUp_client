import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList"
import { EventList } from "./event/EventList"
import { GameForm } from "./game/GameForm"
import { EventForm } from "./event/EventForm"
import { Profile } from "./profile/Profile"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>
        </main>
    </>
}
