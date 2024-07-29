import React, { useEffect,useState} from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
const Player = () => {
  
  const {id} = useParams();

  const navigate = useNavigate()

  const [apiData,setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDU4OGMzMjg1ZGJjM2Q4ODExZmQyZTYwNTYzNTllYSIsIm5iZiI6MTcyMDA3NTQ1NS4xOTM4NDgsInN1YiI6IjY2ODY0MzhlOTYyZmFjZGU2MjkwNTdhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H0A-I4nc8AQmxIrpQrt73nbDuDkFktrThzNBj8QUXHc'
    }
  };

  useEffect(()=>{
     fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  },[])
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
      <iframe src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' width="90%" height="90%"  frameborder="0" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
