import { useId, useRef } from "react";

function SignUp() {
  const email = useRef(null);
  const password = useRef(null);

  /* const emailId = useId()
  const passwordId = useId() */

  const id = useId()

  const handleSubmit =(e) => {
    e.preventDefault()
    console.log(email.current.value ,password.current.value )

  }

  return (
    <form onSubmit={handleSubmit}>
      <label >Email</label>
      <input type="text" id={id + "email"} ref={email} />

      <br />

      <label>Password</label>
      <input type="text" id={id + "password"} ref={password} />

      <br />
      <button>Signup</button>
    </form>
  );
}

export default SignUp;
