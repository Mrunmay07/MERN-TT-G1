import { NavLink } from "react-router-dom"

function Card({currMovies}){
    return(
        <div className="card">
            <img src={currMovies.Poster} alt="" />
            <h2>{currMovies.Title}</h2>
            <p>{currMovies.Year}</p>
            <p>{currMovies.imdbID}</p>
           
           <NavLink to={`/movies/${currMovies.imdbID}`}>
             <button>Watch Now</button>
           </NavLink>
        </div>
    )
}

export default Card