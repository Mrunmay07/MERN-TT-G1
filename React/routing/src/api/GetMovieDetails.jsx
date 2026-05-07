async function getMovieDetails({params}){
    const res = await fetch(`http://www.omdbapi.com/?i=${params.movieID}&apikey=a5e6060b&`)
    const data = await res.json()
    console.log(data)
    return data
}

export default getMovieDetails