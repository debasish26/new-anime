
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import "../main.css"
const Genres = () => {
  const { id } = useParams();
  const [gendetails, setGenDetails] = useState([])
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`https://api-aniwatch-wine.vercel.app/anime/genre/${id}`);
        const fetchedGenre = response.data.animes.map(genre => ({
          id: genre.id,
          title: genre.name,
          image: genre.poster,
          tv: genre.type,
          duration: genre.duration,
          sub: genre.episodes.sub,
          dub: genre.episodes.dub
        }));

        setGenDetails(fetchedGenre)





      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    };

    fetchGenres();
  }, []);
  return (
    <div>

      <div className="cards-container-notscroll">
        <h2>{id}</h2>
        <div className="cards-notscroll">
          {gendetails.slice(0, 15).map((genre) => (
            <Link key={genre.id} to={`/info/${genre.id}`} className="card-notscroll" style={{ backgroundImage: `url(${genre.image})` }}>
              <div className="card-content-notscroll">
                <h3>{genre.title}</h3>
                <div className="card-info">
                  <span className="card-genre">{genre.genres}</span>
                  <span className="card-status">{genre.status}</span>
                  <span className="card-type">{genre.type}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Genres
