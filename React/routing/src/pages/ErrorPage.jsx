import { useNavigate, useRouteError } from "react-router-dom";

function ErrorPage() {
  const errorText = useRouteError();
  console.log(errorText);

  const navigate = useNavigate()

  function handleClick(){
    navigate(-2)
  }

  return (
    <>
      <h1>This is Error Page</h1>
      <h2>{errorText.data}</h2>
      <p>{errorText.status}</p>
      <button  onClick={handleClick}>Go Back</button>
    </>
  );
}

export default ErrorPage;
