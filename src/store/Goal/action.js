import { apiUrl } from "../../config/constants";
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


  export const fetchGoal = () => {
    return async (dispatch, getState) => {
      try {
          const {id}=selectUser(getState())
        //console.log("I am from fetchMyExpenses");
        //console.log("id", id);
        const res = await axios.get(`${apiUrl}/user/${id}/savings`);
        console.log("My Goal", res);
        dispatch(goalFetches(res.data));
      } catch (e) {
        console.log(e.message);
      }
    };
  };

export const newGoal = (goal_name, target_amount, desire_date) => {
  return async (dispatch, getState) => {
    try {
      console.log("I am from new expense function");
      const { id } = selectUser(getState());
      console.log("id from goal", id);
      const response = await axios.post(`${apiUrl}/user/savings/${id}`, {
        goal_name,
        target_amount,
        desire_date,
      });
      console.log("New Goal", response);
      dispatch(newGoalAdded(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
