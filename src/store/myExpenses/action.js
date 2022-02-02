import axios from "axios";

import { selectUser } from "../user/selector";

import { apiUrl } from "../../config/constants";
import { appLoading, appDoneLoading } from "../appState/action";

const myExpensesFetches = (expenses) => {
  return {
    type: "MYEXPENCES_FETCH",
    payload: expenses,
  };
};

const categoryFetched = (category) => {
  return {
    type: "CATEGORY_FETCH",
    payload: category,
  };
};

const newExpenseAdded = (newEx) => {
  return {
    type: "NEW_EXPENSE",
    payload: newEx,
  };
};

const selectedMonth = (month) => {
  return {
    type: "SELECTED_MONTH",
    payload: month,
  };
};

export function expenseDeleted(id) {
  return {
    type: "DELETE_EXPENSE",
    payload: id,
  };
}

export const fetchMyExpenses = (id) => {
  return async (dispatch, getState) => {
    try {
      //console.log("I am from fetchMyExpenses");
      //console.log("id", id);
      const res = await axios.get(`${apiUrl}/user/my_expenses/${id}`);
      console.log("My Expense", res);
      dispatch(myExpensesFetches(res.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const getCategory = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(`${apiUrl}/user/category`);
      //console.log("Category table info", res);
      dispatch(categoryFetched(res.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const newExpense = (amount, date, categoryId) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      console.log("I am from new expense function");
      const { id } = selectUser(getState());
      const response = await axios.post(`${apiUrl}/user/my_expenses/${id}`, {
        amount,
        date,
        categoryId,
      });
      console.log("New Expense", response);
      dispatch(newExpenseAdded(response.data));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};

//search by month
export const expenseByMonth = (month) => {
  return async (dispatch, getState) => {
    try {
      // const month=req.params.month
      const res = await axios.get(`${apiUrl}/user/my_expenses/month/${month}`);
      console.log("selected month expenses: ", res);
      dispatch(selectedMonth(res.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

//delet a expense
export const deleteExpense = (id) => async (dispatch, getstate) => {
  try {
    const res = await axios.delete(`${apiUrl}/user/my_expenses/delete/${id}`);
    console.log("deleted?", res.data);
    dispatch(expenseDeleted(id));
  } catch (e) {
    console.log(e.message);
  }
};
