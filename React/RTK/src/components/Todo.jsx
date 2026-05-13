import { useDispatch, useSelector } from "react-redux"
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { addTask, deleteTask } from "../store/Store";

function Todo(){

    const [task , setTask] = useState('')

    const todos = useSelector((state) => state.taskReducer.task)
    console.log(todos)
    // Array ['Coding','Gaming' ,...]

    // useDispatch()
    const dispatch = useDispatch() // function 

    // function define
    function handleSubmit(e){
        e.preventDefault()
        dispatch(addTask(task))
        setTask('')
    }

    function handleChange(e){
        setTask(e.target.value)
    }

    function handleDelete(id){
        dispatch(deleteTask(id))
    }

    return(
        <div className="container">
            <h1>Todo Application</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={task} onChange={handleChange} />
                <button>Add</button>
            </form>
            
            <ul>
                {
                   todos.map((currTask, index) => {
                        return <div key={index}>
                            <p>{index} {currTask}</p>

                            <button onClick={() => handleDelete(index)}>
                                <MdDelete />
                            </button>
                        </div>
                   }) 
                }
            </ul>
        </div>
    )
}

export default Todo