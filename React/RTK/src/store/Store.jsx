import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: [],
};


// Slices // utility function 
const taskReducer = createSlice({
    name:"task", // Slice name
    initialState, // initalState
    reducers:{
        addTask(state , action ){
           state.task.push(action.payload) 
        },
        deleteTask(state , action){
            state.task = state.task.filter((currTask , index) => {
                return index !== action.payload
            })
        }
    }
})

console.log(taskReducer)
export const {addTask , deleteTask}= taskReducer.actions
console.log(addTask)

// Store
export const store = configureStore({
    reducer:{
        taskReducer:taskReducer.reducer
    }
})
console.log(store)

store.dispatch(addTask('Coding'))
store.dispatch(addTask('Cooking'))
store.dispatch(addTask('Sleeping'))
store.dispatch(deleteTask(1))
