import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

import axios from "axios";

// const api = 'http://localhost:4000'
const api = 'https://node-gamesdb.herokuapp.com'


const Games = () => {
  const [gameTitle, setGameTitle] = useState("");
  const [games, setGames] = useState([]);
  const [backlogGames, setBacklogGames] = useState([]);

  const tableTitles = ["#", "Title", "System"];


  const searchGame = async (e) => {
    
    e.preventDefault();
    if (gameTitle === '') return toast.error('Must enter a title!', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      });
    const res = await axios.post(api, {
      gameTitle,
    });
    if (res.data.length === 0) return toast.error('No games with that title!', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      });
   
    console.log(res.data)
    let data = res.data

    data.forEach(dataGame => {
      backlogGames.forEach(game => {
        if (dataGame.title === game.title && dataGame.system === game.system) {
          dataGame.backlog = true;
        }
   
      })
    })
    setGames(data);
  };

  const addToBacklog = async (game) => {
    // e.preventDefault()
    try {
    const res = await axios.post(`${api}/backlog`,{
      game},{
      Headers: {
        "Access-Control-Allow-Origin": "*"
      }}
  )
    console.log(res)
   
      toast.success(`${game.title} Added to Backlog!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } catch (error) {
      toast.error('This game is already added', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
      
  }

  const getBacklogGames = async() => {
    const res = await axios.get(`${api}/backlog`)
    // console.log(res.data)
    setBacklogGames(res.data)
  }

  useEffect(() => {
    getBacklogGames()
  }, [])

  return (
    <div className='container'>
      <form className="py-4 d-flex">
        <input
          type='text'
          placeholder='search a game'
          onChange={(e) => setGameTitle(e.target.value)}
          className='form-control'
          style={{width: '400px'}}
        />
        <button onClick={(e) => searchGame(e)} className="btn btn-dark">Search</button>
      </form>

      {games ? (
        <table className='table'>
          <thead>
            <tr>
            {tableTitles.map((title, index) => (
              <th key={title}>{title}</th>
            ))}
            </tr>
          </thead>
          <tbody>
            {games.map((game, index) => (
              <tr key={game.id}>
                <th >{index + 1}</th>
                <td >{game.title}</td>
                <td>{game.system}</td>
                <td>
                  {game.backlog 
                    ? 
                    <button className="btn btn-secondary disabled">Added</button>
                    : 
                    <button onClick={() => addToBacklog(game)} className="btn btn-dark">Backlog</button>
                  } 
                  
                </td>
     
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "Search a Game"
      )}
    </div>
  );
};

export default Games;
