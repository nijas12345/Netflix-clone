import React, { useEffect,useRef,useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'
const TitleCards = ({title,category}) => {
  const [apiData,setApiData] = useState([])
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDU4OGMzMjg1ZGJjM2Q4ODExZmQyZTYwNTYzNTllYSIsIm5iZiI6MTcyMDA3NTQ1NS4xOTM4NDgsInN1YiI6IjY2ODY0MzhlOTYyZmFjZGU2MjkwNTdhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H0A-I4nc8AQmxIrpQrt73nbDuDkFktrThzNBj8QUXHc'
    }
  };
  
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

  const handleWheel = (event) =>{
    event.preventDefault()
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{

     
  fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));  

    cardsRef.current.addEventListener('wheel',handleWheel)
  },[])
  return (
    <div className='title-cards'>
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>
          {apiData.map((card,index)=>{
            return <Link to={`/player/${card.id}`} className='card' key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          })}
        </div>
    </div>
  )
}

export default TitleCards