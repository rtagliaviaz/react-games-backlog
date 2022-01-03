import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
// const api = "http://localhost:4000";
const api = 'https://node-gamesdb.herokuapp.com'

const Backlog = () => {
  const [backlog, setBacklog] = useState([]);
  const [search, setSearch] = useState("");

  const tableTitles = ["#", "Title" ];
  const history = useHistory()
  const getBacklog = async () => {
    const res = await axios.get(`${api}/backlog`);
    // console.log(res.data);
    sortBacklog(res.data)
    // setBacklog(res.data);
    
  };

  const removeFromBacklog = async (id, title) => {
    await axios.delete(`${api}/backlog/${id}`);
    getBacklog();
    toast.success(`${title} Completed!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  };

  const sortBacklog = (games) => {
    games.sort((a, b) => a.title.localeCompare(b.title))
    setBacklog(games)
  };

  /*
    game card:
    -details about the game
      -title
      -platform
      -cover image
      -comments : 
        -comment ( good game, favorite, bla bla)
        -how long to beat  
  */

  /*
    priority system:
    -green: high priority
    -yellow: mid priority
    -red: low priority
  */

  const gameInfo = (game) => {
    console.log(game);
  }

  useEffect(() => {
    getBacklog();
    
  }, []);


  const filteredGames = backlog.filter(
    (game) =>
      game.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <form action=''>
          <input
            type='text'
            placeholder='Search a game'
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "40%", margin: "10px auto", border: 'none', borderBottom: '1px solid black'}}
          />
        </form>
      {backlog ? (
        <table className='table'>
          <thead>
            <tr>
              {tableTitles.map((title, index) => (
                <th key={title} >{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredGames.map((game, index) => (
              <tr key={game._id} >
                <th scope='row'>{index + 1}</th>
                {/* <td onClick={() => history.push(`/details/${game._id}`)}>{game.title} <br /><p style={{fontSize: '14px', color: 'gray'}}>{game.system}</p></td> */}
                <td >{game.title} <br /><p style={{fontSize: '14px', color: 'gray'}}>{game.system}</p></td>
                {/* <td>{game.system}</td> */}
                <td>
                <div className="dropdown d-flex">
                <button onClick={() => removeFromBacklog(game._id, game.title)} className='btn btn-dark'>
                  &#10003;
                  </button>
                  {/* <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"> */}
                  {/* &#10247; */}
                  {/* Priority */}
                  {/* </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" >High</a></li>
                    <li><a className="dropdown-item" >Mid</a></li>
                    <li><a className="dropdown-item" >Low</a></li>
                  </ul> */}
                  
                </div>

                  
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

export default Backlog;
