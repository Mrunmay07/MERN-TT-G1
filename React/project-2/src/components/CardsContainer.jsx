import Card from "./Card";
import seriesData from "../api/seriesData.json";
import '../styles/CardsContainer.css'

function CardsContainer() {
  return (
    <div className="cards-container">
      {seriesData.map((currSeries) => (
        <Card key={currSeries.id}
          title={currSeries.title}
          description={currSeries.description}
          image={currSeries.image}
        />
      ))}
    </div>
  );
}

export default CardsContainer;
