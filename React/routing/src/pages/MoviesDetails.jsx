import { useLoaderData } from "react-router-dom"

function MoviesDetails(){

    const movieData = useLoaderData()

    
    return(
        <>
            <h1>{movieData.Title}</h1>
            <img src={movieData.Poster} alt="" />
            <p>{movieData.Actors}</p>
        </>
    )
}

export default MoviesDetails