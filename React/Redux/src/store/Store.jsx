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
const store = createStore(reducer)
console.log(store)

store.dispatch({type:ADD_TASK , payload:'CODING'})

console.log(store.getState())

store.dispatch({type:ADD_TASK , payload:'GAMING'})

console.log(store.getState())