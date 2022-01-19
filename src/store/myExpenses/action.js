import axios from "axios";
import { apiUrl } from "../../config/constants";

const myExpensesFetches = (expenses) => {
  return {
    type: "MYEXPENCES_FETCH",
    payload: expenses,
  };
};

export const fetchMyExpenses = (id) => {
  return async (dispatch, getState) => {
    try {
      console.log("I am from fetchMyExpenses");
      console.log("id", id);
      const res = await axios.get(`${apiUrl}/user/my_expenses/${id}`);
      console.log("My Expense", res);
      dispatch(myExpensesFetches(res.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
