const initialState = {
  goals: [],
  goal_detail: {},
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
        goal_detail: { ...action.payload },
      };
    }

    default:
      return state;
  }
}
