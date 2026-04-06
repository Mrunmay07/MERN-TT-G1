import Card from "./Card";
import seriesData from "../api/seriesData.json";
import '../styles/CardsContainer.css'
import { useEffect, useState } from "react";

function CardsContainer() {

  const [productsData , setProductsData] = useState([])


  async function getProducts(){
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()
    console.log(data.products)
    setProductsData(data.products)
  }


  useEffect(() => {
      getProducts()
  } , [])

  return (
    <div className="cards-container">
      {productsData.map((currSeries) => (
        <Card key={currSeries.id}
          title={currSeries.title}
          description={currSeries.description}
          image={currSeries.images[0]}
        />
      ))}
    </div>
  );
}

export default CardsContainer;
