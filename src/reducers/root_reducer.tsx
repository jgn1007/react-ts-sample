import { combineReducers } from "redux";
import { redTodo } from "./todo_reducer";

const rootReducer = combineReducers({
  todo: redTodo
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
