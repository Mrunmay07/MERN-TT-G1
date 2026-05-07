import { composeWithDevTools } from '@redux-devtools/extension'
import {createStore} from 'redux'


// actions
const ADD_TASK = 'task/add'
const DELETE_TASK = 'task/delete'


    const initialState = {
        task:[]
    }

function reducer(state = initialState , action){
    switch (action.type) {
        case ADD_TASK:
            return {...state , task:[...state.task ,action.payload]}
            
        case DELETE_TASK:
            const updatedArray = state.task.filter((curr , index) => {
                return index !== action.payload
            })

            return {...state , task:updatedArray}
        
    }
}

// Creating a Global Store
export const store = createStore(reducer , composeWithDevTools())
console.log(store)

store.subscribe(() => {
    console.log(store.getState())
})

// action creators
export function addTask(data){
    return {type:ADD_TASK , payload:data}
}

export function deleteTask(id){
    return {type:DELETE_TASK , payload:id }
}

store.dispatch(addTask('Coding'))
store.dispatch(addTask('Gaming'))
store.dispatch(addTask('Study'))
store.dispatch(deleteTask(1))

