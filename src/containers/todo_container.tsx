import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from 'actions/todo'
import { ITodoState } from 'reducers/todo_reducer';
import { AnyAction, Dispatch } from 'redux';
import { TodoComponent } from "components/todo_component"

/* 操作を加えることもできるが、今回は何も操作を加えない stateをそのままPropsに渡す */
const mapStateToProps = (state: ITodoState) => state
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({ dispatch });

/* ReduxのStore由来のデータとDispatcherをPropsに格納して、TodoComponentに渡す。 */
export default connect(mapStateToProps, mapDispatchToProps)(TodoComponent);
