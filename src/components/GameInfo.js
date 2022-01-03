import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";


const api = 'http://localhost:4000'

const GameInfo = () => {

  const history = useHistory();
  const params = useParams();
  const [game, setGame] = useState();
  const getGameInfo = async () => {
    const res = await axios.get(`${api}/backlog/${params.id}`)
    console.log(res.data)
    setGame(res.data)
  }

  useEffect(() => {
    getGameInfo()
  }, [])
  return (

    <div>
      <button onClick={() => history.push('/backlog')} className="btn btn-dark">back</button>
      {game ? <div style={{margin: '40px'}}>
        
      <img src={game.img} alt="" />
      <h1>{game.title}</h1>
      <h2>{game.system}</h2>
      
      <div className="form-floating">
  <textarea className="form-control" placeholder="Leave a comment here"  style={{height: '100px', width: '400px', margin: '20px 0',}}/>
  <button className="btn btn-dark">Add Comment</button>

</div>

      </div>: 'loading...'}
      
    </div>
  )
}

export default GameInfo
