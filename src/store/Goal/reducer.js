const initialState = {
  goals: [],
  details: {},
  // goal_detail: {},
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

    default:
      return state;
  }
}
