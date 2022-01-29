export const selectMyExpenses = (state) => state.myExpenses.myExpenses;

export const selectCategory = (state) => state.myExpenses.category;

export const selectSearchMonth = (state) =>
  state.myExpenses.selectedMonthExpenses;
