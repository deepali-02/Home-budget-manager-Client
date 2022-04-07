import { apiUrl } from "../../config/constants";
import { selectGoalDetails } from "./selector";
import axios from "axios";
import { selectUser } from "../user/selector";

const goalFetches = (allGoal) => {
  return {
    type: "GOAL_FETCH",
    payload: allGoal,
  };
};

const newGoalAdded = (goal) => {
  return {
    type: "NEW_GOAL",
    payload: goal,
  };
};

const savingDetail = (goal_detail) => {
  return {
    type: "DETAIL_SAVING",
    payload: goal_detail,
  };
};

const amountUpdated = (amount) => {
  return {
    type: "UPDATE AMOUNT",
    payload: amount,
  };
};

const dateUpdated = (date) => {
  return {
    type: "UPDATE DATE",
    payload: date,
  };
};

export const fetchGoal = () => {
  return async (dispatch, getState) => {
    try {
      const { id } = selectUser(getState());
      //console.log("I am from fetchMyExpenses");
      //console.log("id", id);
      const res = await axios.get(`${apiUrl}/user/${id}/savings`);
      // console.log("My Goal", res);
      dispatch(goalFetches(res.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const newGoal = (goal_name, target_amount, desire_date) => {
  return async (dispatch, getState) => {
    try {
      // console.log("I am from new expense function");
      const { id } = selectUser(getState());
      // console.log("id from goal", id);
      const response = await axios.post(`${apiUrl}/user/new_savings/${id}`, {
        goal_name,
        target_amount,
        desire_date,
      });
      // console.log("New Goal", response);
      dispatch(newGoalAdded(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const detailsaving = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(`${apiUrl}/user/savings/${id}`);
      console.log("Savings Details", res);
      dispatch(savingDetail(res.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const addToSave = (saved_amount) => {
  return async (dispatch, getState) => {
    try {
      const goal = selectGoalDetails(getState());
      const res = await axios.patch(`${apiUrl}/user/addSaving/${goal.id}`, {
        saved_amount,
      });
      // console.log("Amount updated? ", res);
      dispatch(amountUpdated(res.data.saved_amount));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const changeGoalDate = (desire_date) => {
  return async (dispatch, getState) => {
    try {
      console.log("date in action", desire_date);
      const goal = selectGoalDetails(getState());
      const res = await axios.patch(`${apiUrl}/user/savings/${goal.id}`, {
        desire_date,
      });
      console.log("Date updated?", res);
      dispatch(dateUpdated(res.data.desire_date));
    } catch (e) {
      console.log(e.message);
    }
  };
};
