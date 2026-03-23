import { useState } from "react"

function SignUp(){
   /*  const [firstName , setFirstName] = useState('')
    const [lastName , setLastName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('') */

    const [user , setUser] = useState({
        firstName:'',
        lastName : '',
        email : '',
        password:'',
       
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = {
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            password : user.password,
            
        }
        console.log(formData)
        
    }

    const handleChange = (e) => {
     const {name , value} = e.target

     setUser((prev) => ({...prev , [name] : value}))

    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="">FirstName</label>
            <input type="text" value={user.firstName}  name="firstName" onChange={handleChange} />
            <br />
            <label htmlFor="">LastName</label>
            <input type="text" value={user.lastName} onChange={handleChange} name="lastName" />
            <br />
            <label htmlFor="">Email</label>
            <input type="text" value={user.email} name="email" onChange={handleChange}/>
            <br />
            <label htmlFor="">Password</label>
            <input type="text" value={user.password}   name="password" onChange={handleChange}/>

             <label htmlFor="">Age</label>
            <input type="text" value={user.age}   name="password" onChange={handleChange}/>
            <br />
            <button>SignUp</button>
        </form>
    )
}

export default SignUp