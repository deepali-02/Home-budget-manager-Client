import axios from "axios";

import { selectUser } from "../user/selector";

import { apiUrl } from "../../config/constants";

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

export const fetchMyExpenses = (id) => {
  return async (dispatch, getState) => {
    try {
      //console.log("I am from fetchMyExpenses");
      //console.log("id", id);
      const res = await axios.get(`${apiUrl}/user/my_expenses/${id}`);
      //console.log("My Expense", res);
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
    try {
      console.log("I am from new expense function");
      const { id } = selectUser(getState());
      const res = await axios.post(`${apiUrl}/user/my_expenses/${id}`, {
        amount,
        date,
        categoryId,
      });
      console.log("New Expense", res);
    } catch (e) {
      console.log(e.message);
    }
  };
};
