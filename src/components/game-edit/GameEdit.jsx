import { useEffect, useState } from "react";
import { useParams } from "react-router";
import request from "../../utils/request";

const initialValues = {
    title: "",
    genre: "",
    activePlayers: 0,
    releaseDate: "",
    imageUrl: "",
    summary: ""
};

export default function GameEdit() {
    const {gameId} = useParams();
    const [game, setGame] = useState(initialValues);

        const changeHandler = (e) => {
        setGame(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {
        // Fetch game details by gameId and populate the form
        request(`/games?id=eq.${gameId}`)
        // The request returns an array, we take the first element as the game details
            .then(data => setGame(data[0]))
            .catch(error => {
                alert(error.message);
            });

    }, [gameId]);

    return (

        <section id="edit-page">
            <htmlForm id="add-new-game">
                <div className="container">

                    <h1>Edit Game</h1>

                    <div className="htmlForm-group-half">
                        <label htmlFor="gameName">Game Name:</label>
                        <input type="text" id="gameName" name="title" placeholder="Enter game title..." value={game.title} onChange={changeHandler} />
                    </div>

                    <div className="htmlForm-group-half">
                        <label htmlFor="genre">Genre:</label>
                        <input type="text" id="genre" name="genre" placeholder="Enter game genre..." value={game.genre} onChange={changeHandler} />
                    </div>

                    <div className="htmlForm-group-half">
                        <label htmlFor="activePlayers">Active Players:</label>
                        <input type="number" id="activePlayers" name="activePlayers" min="0" placeholder="0" value={game.activePlayers} onChange={changeHandler} />
                    </div>

                    <div className="htmlForm-group-half">
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input type="date" id="releaseDate" name="releaseDate" value={game.releaseDate} onChange={changeHandler} />
                    </div>

                    <div className="htmlForm-group-full">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input type="text" id="imageUrl" name="imageUrl" placeholder="Enter image URL..." value={game.imageUrl} onChange={changeHandler} />
                    </div>

                    <div className="htmlForm-group-full">
                        <label htmlFor="summary">Summary:</label>
                        <textarea name="summary" id="summary" rows="5"
                            placeholder="Write a brief summary..." value={game.summary} onChange={changeHandler}></textarea>
                    </div>

                    <input className="btn submit" type="submit" value="EDIT GAME" />
                </div>
            </htmlForm>
        </section>

    );
}