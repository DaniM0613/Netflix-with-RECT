import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useRef, useEffect, useState } from 'react'


const TitleCards = ({title, category}) => {

    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTdhMjJhMWVlYTY1Y2VlZTQyYzhhMDhkYWJkNGUyMSIsInN1YiI6IjY2NzQ3ZDNhMDlmNjc3NWIxYTI1MDRhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oXbe2xggTY8BZSPFTiwITPkqjqb4HsJ5xYqI8VzyyrM'
        }
      };
      
     

    const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=> {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
    

    cardsRef.current.addEventListener('wheel', handleWheel);
},[])

    return (
        <div className='title-cards'>
            <h2>{title ? title: "Popular on Netflix"}</h2>
            <div className='card-list' ref={cardsRef}>
                {apiData.map((card, index)=>{
                   return <div className='card' key={index}>
                    <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=''/>
                    <p>{card.original_title}</p>
                   </div> 
                })}
            </div>
        </div>
    )
}
export default TitleCards