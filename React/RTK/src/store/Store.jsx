import { configureStore, createSlice } from "@reduxjs/toolkit";


const initialState = {
  task: [],
};


// Store
const store = configureStore({
    reducer:{
        taskReducer:taskReducer.reducer
    }
})

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