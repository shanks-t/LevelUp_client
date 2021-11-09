import React, { useEffect, useState } from "react"
import { getGames, deleteGame } from "./GameManager.js"
import { GameUpdateForm } from "./GameUpdateForm.js"
import { GameCreateForm } from "./GameCreateForm.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const [ showUpdateForm, setShowUpdateForm ] = useState(false)
    const [ showCreateForm, setShowCreateForm ] = useState(false)
    const [ gameObjectForUpdate, setGameObjectForUpdate ] = useState({
        "id": '',
        "title": '',
        "maker": '',
        "numberOfPlayers": '',
        "skillLevel": '',
        "gameTypeId": ''
    })

    const gameFetcher = () => {
        getGames().then(gameData => setGames(gameData))
    }

    useEffect(() => {
        gameFetcher()
    }, [showUpdateForm, showCreateForm])

    useEffect(() => {
        console.log('games', games)
        console.log('gameToUpdate', gameObjectForUpdate)
        console.log('showCreate', showCreateForm)
        console.log('showUpdate', showUpdateForm)
    }, [games, gameObjectForUpdate, showCreateForm, showUpdateForm])

    const handleUpdateFormToggle = () => {
        if(showUpdateForm) {
            setShowUpdateForm(false)
        }else{
            setShowUpdateForm(true)
        }
    }
    const handleCreateFormToggle = () => {
        if(showCreateForm) {
            setShowCreateForm(false)
        }else{
            setShowCreateForm(true)
        }
    }

    const updateFormJSX =
        <div>
            <GameUpdateForm gameToUpdate={gameObjectForUpdate} setShowUpdateForm={setShowUpdateForm}/>
        </div>
    const createFormJSX =
        <div>
            <GameCreateForm setShowCreateForm={setShowCreateForm}/>
        </div>

    return (
        <>
        {showCreateForm ? createFormJSX
            : (showUpdateForm) ? updateFormJSX
            
            :

            <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    handleCreateFormToggle()
                }}>Create A New game</button>
            
            {
                    games.map(game => {
                        return <section key={`game--${game.id}`} className="game">
                            <div className="game__title">{game.title} by {game.maker}</div>
                            <div className="game__players">{game.number_of_players} players needed</div>
                            <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button className='delete-btn'
                        onClick={
                            () => { 
                                deleteGame(game.id)
                                    .then(()=> gameFetcher())
                                    }}>delete game</button>
                                <button className="btn btn-2 btn-sep icon-create"
                        onClick={
                            () => {
                                handleUpdateFormToggle()
                                setGameObjectForUpdate({
                                "id": game.id,
                                "title": game.title,
                                "maker": game.maker,
                                "numberOfPlayers": game.number_of_players,
                                "skillLevel": game.skill_level,
                                "gameTypeId": game.game_type.id
                                })
                            }}>Update Game</button>
                    </section>
                })
            }
        </article>

        }
    </>
    )
    }