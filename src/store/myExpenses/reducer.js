const initialState = {
  myExpenses: [],
  category: [],
  selectedMonthExpenses: [],
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

    case "NEW_EXPENSE": {
      return {
        ...state,
        myExpenses: [...state.myExpenses, action.payload],
      };
    }

    case "SELECTED_MONTH": {
      return {
        ...state,
        selectedMonthExpenses: [...action.payload],
      };
    }

    case "DELETE_EXPENSE": {
      const expenseId = action.payload;
      const expenses = state.myExpenses;
      console.log("expenses from DELETE", expenses);
      const filterExpense = expenses.filter((ex) => ex.id !== expenseId);
      // console.log("filter expenses ", filterExpense);
      return {
        ...state,
        myExpenses: filterExpense,
      };
    }

    default:
      return state;
  }
}
