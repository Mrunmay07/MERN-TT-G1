import { useLoaderData } from "react-router-dom"
import Card from "../components/ui/Card"
import '../styles/Movies.css'

function Movies(){
    const moviesData = useLoaderData()
    console.log(moviesData)
    return(
      <ul className="cards-container">
        {
            moviesData.Search.map((currMovies) => {
                return <Card currMovies={currMovies}/>
            })
        }
      </ul>
    )
}

export default Movies