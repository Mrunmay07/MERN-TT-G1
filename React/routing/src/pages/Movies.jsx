import { useLoaderData } from "react-router-dom"
import Card from "../components/ui/Card"

function Movies(){
    const moviesData = useLoaderData()
    console.log(moviesData)
    return(
      <ul>
        {
            moviesData.Search.map((currMovies) => {
                return <Card/>
            })
        }
      </ul>
    )
}

export default Movies