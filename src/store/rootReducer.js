import { combineReducers } from "redux";
import appStateReducer from "./appState/reducer";
import userReducer from "./user/reducer";
import myExpensesReducer from "./myExpenses/reducer";
import goalReducer from "./Goal/reducer";

export default combineReducers({
  appState: appStateReducer,
  user: userReducer,
  myExpenses: myExpensesReducer,
  goals: goalReducer,
});
