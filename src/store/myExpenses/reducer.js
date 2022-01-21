const initialState = {
  myExpenses: [],
  category: [],
};

export default function myExpensesReducer(state = initialState, action) {
  switch (action.type) {
    case "MYEXPENCES_FETCH": {
      return {
        ...state,
        myExpenses: [...action.payload],
      };
    }

    case "CATEGORY_FETCH": {
      return {
        ...state,
        category: [...action.payload],
      };
    }

    default:
      return state;
  }
}
