const initialState={
    myExpenses:[]
}

export default function myExpensesReducer(state = initialState, action) {
    switch (action.type) {
        case "MYEXPENCES_FETCH":{
            return{
                ...state,
                myExpenses:[...action.payload]
            }
        }
        default: return state
    }
}