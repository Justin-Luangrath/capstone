import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./GameTable.scss";

const API_KEY = "ea9b0100a5d64861a831ad375858e3bf";

const GameTable = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchLibrary();
  }, []);

  const fetchLibrary = async () => {
    try {
      const userId = 1; // Replace with the actual user ID
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}/library`
      );
      const gameIds = response.data.map((game) => game.game_id).join(",");

      if (gameIds) {
        const gameDataResponse = await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&ids=${gameIds}`
        );
        setGames(gameDataResponse.data.results);
      }
    } catch (error) {
      console.error("Error fetching library:", error);
    }
  };

  const handleDeleteGame = async (gameId) => {
    try {
      const userId = 1; // Replace with the actual user ID
      await axios.delete(
        `http://localhost:5000/api/users/${userId}/library/${gameId}`
      );
      setGames(games.filter((game) => game.id !== gameId));
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Released</th>
            <th>Cover</th>
            <th>Rating</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id} className={styles.tableRow}>
              <td>{game.name}</td>
              <td>{game.released}</td>
              <td>
                <img src={game.background_image} alt={game.name} width="100" />
              </td>
              <td>{game.rating}</td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteGame(game.id)}
                >
                  &times;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GameTable;
