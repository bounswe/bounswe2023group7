import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';

const token = localStorage.getItem("accessToken");

const GameHistory = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get("http://localhost:8080/api/random-game/history", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setGames(result.data.reverse());
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                color: 'dark grey',
                marginTop: '2rem',
                marginBottom: '2rem',
            }}>
                {games.map((game, index) => (
                    <React.Fragment key={game.id}>
                        <div className="game-card">
                            <img src={game.headerImage} alt={game.name} />
                            <div className="game-info">
                                <h2>{game.name}</h2>
                                <p>{game.shortDescription}</p>
                                <p>{game.price}</p>
                            </div>
                        </div>
                        {index !== games.length - 1 && <Box sx={{ marginBottom: '5rem' }} />}
                    </React.Fragment>
                ))}
            </Box>
        </div>
    );
};

export default GameHistory;
