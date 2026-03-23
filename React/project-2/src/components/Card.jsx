import '../styles/Card.css'

function Card(props) {
  return (
    <div className="card">
      <img src={props.image} alt="" width={'200px'} />
      <h2 style={{color:"red"}}>{props.title}</h2>
      <p>{props.description}</p>
      <button>Watch Now</button>
    </div>
  );
}

export default Card;
