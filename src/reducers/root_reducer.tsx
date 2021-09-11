import { combineReducers } from "redux";
import { redFilter } from "./filter_reducer";
import { redTodo } from "./todo_reducer";

const rootReducer = combineReducers({
  todo: redTodo,
  filter: redFilter
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
