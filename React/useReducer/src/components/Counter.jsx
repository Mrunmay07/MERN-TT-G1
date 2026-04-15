import { useReducer } from "react";

function Counter() {

    const initialState = {
        count : 0,
        
    }

    function reducer(state = initialState  ,action){
       switch (action.type) {
        case "INCREMENT":
            return {...state , count : state.count + 1 }

        case "DECREMENT":
            return {...state , count : state.count - 1}
       
        default:
            break;
       } 
    }

    const  [state , dispatch]  = useReducer(reducer , initialState)

  return (
    <>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({type:"INCREMENT"})}>INCREMENT</button>

      <button onClick={() => dispatch({type:"DECREMENT"})}>DECREMENT</button>
    </>
  );
}

export default Counter;
