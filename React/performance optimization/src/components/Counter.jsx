import { useCallback, useMemo, useState } from "react";
import Sum from "./Sum";

function Counter() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(100000);
  // heavy computations
 

  const prime = useMemo(() => {
    let total = 0;
    if (number > 1) {
      total++;
    }
    for (let i = 3; i <= number; i++) {
      total++;
      for (let j = 2; j < i; j++) {
        if (i % j == 0) {
          total--;
          break;
        }
      }
    }

    return total;
  }, []);

  const sayHello = useCallback(() => {
    console.log('hello how are you')
  } , [])
  
  

  console.log("Counter Component rendered");
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>INCREMENT</button>

      <Sum />

      <h1>Prime numbers : {prime}</h1>
    </>
  );
}

export default Counter;
