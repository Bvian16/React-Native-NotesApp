import {
  ADD_NOTE,
  ADD_USERS,
  DELETE_NOTE,
  EDIT_NOTE,
  FETCH_DATA,
  FETCH_NOTES,
  REMOVE_CURRENT_USER,
  UPDATE_CURRENT_USER,
} from './action';
import {initialState} from './initialState';

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          userId: action.userId,
          password: action.password,
        },
      };
    case ADD_USERS:
      return {
        ...state,
        users: [
          ...state.users,
          {userId: action.userId, password: action.password},
        ],
      };
    case FETCH_DATA:
      return {
        ...state,
        currentUser: action.currentUser,
        users: action.users,
      };
    case FETCH_NOTES:
      return {
        ...state,
        notes: action.notes,
      };
    case REMOVE_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: action.notes,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: action.notes,
      };
    case EDIT_NOTE:
      return {
        ...state,
        notes: action.notes,
      };

    default:
      return state;
  }
};
export default rootReducer;
