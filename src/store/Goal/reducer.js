const initialState = {
  goals: [],
  details: {},
  
};

export default function goalReducer(state = initialState, action) {
  switch (action.type) {
    case "GOAL_FETCH": {
      return {
        ...state,
        goals: [...action.payload],
      };
    }
    case "NEW_GOAL": {
      return {
        ...state,
        goals: [...state.goals, action.payload],
      };
    }

    case "DETAIL_SAVING": {
      return {
        ...state,
        details: { ...action.payload },
      };
    }

    case "UPDATE AMOUNT": {
      return {
        ...state,
        ...state.goals,
        details: { ...state.details, saved_amount: action.payload },
      };
    }

    case "UPDATE DATE": {
      console.log("payload", action.payload);
      return {
        ...state,
        ...state.goals,

        details: { ...state.details, desire_date: action.payload },
      };
    }

    case "DELETE_SAVING": {
      const savingId = action.payload;
      const savings = state.goals;
      const filterSavings = savings.filter((saving) => saving.id !== savingId);
      console.log("filter saving ", filterSavings);
      return {
        ...state,
        goals: filterSavings,
      };
    }

    default:
      return state;
  }
}
