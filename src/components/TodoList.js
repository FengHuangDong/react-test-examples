import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as todoActions from '../actions/todo';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../actions/actionsTypes";

export class TodoList extends Component {
  render () {
    return (
      <React.Fragment>
        <nav style={{ marginTop: "60px" }}>
          <ol className="breadcrumb">
            <li
              className={"breadcrumb-item "+ (this.props.visibilityFilter === SHOW_ALL ? 'active' : '') }
              onClick={() => this.props.actions.setVisibilityFilter(SHOW_ALL)}
            >
             All
            </li>
            <li
               className={"breadcrumb-item "+ (this.props.visibilityFilter === SHOW_COMPLETED ? 'active' : '') }
              onClick={() => this.props.actions.setVisibilityFilter(SHOW_COMPLETED)}
            >
              Completed
            </li>
            <li
               className={"breadcrumb-item "+ (this.props.visibilityFilter === SHOW_ACTIVE ? 'active' : '') }
              onClick={() => this.props.actions.setVisibilityFilter(SHOW_ACTIVE)}
            >
              Active
            </li>
          </ol>
        </nav>
        {
          this.props.todos.length !== 0 ? (
            <table
              style={{ marginTop: "60px" }}
              className="table table-hover table-dark"
            >
              <thead>
                <tr>
                  <th scope="col">Todos</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.todos.map((todo,i) => (
                  <tr key={i}>
                    <td
                      style={{
                        textDecoration: todo.completed ? "line-through" : "none"
                      }}
                    >
                      {todo.title} {todo.completed === true ? "(completed)" : ""}
                    </td>
                    <td>
                      <span
                        className="fas fa-minus-circle"
                        onClick={() => this.props.actions.removeFromList(todo)}
                        style={{
                          color: "white",
                          fontSize: "20pt",
                          marginRight: "20px"
                        }}
                      />
                      <span
                        className="fas fa-check-circle"
                        onClick={() => this.props.actions.toogleTodo(todo.id)}
                        style={{ color: "white", fontSize: "20pt" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div
              style={{ marginTop: "50px" }}
              className="col-lg-10 col-md-10 col-xs-12 col-sm-12 offset-lg-1"
            >
              <div className="alert alert-danger" role="alert">
                Todo List is empty or Filter results show no results
              </div>
            </div>
          )
        }
      </React.Fragment>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.array
}
export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_ALL:
      return todos;
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

export function mapStateToProps(state, props) {
    return {
      todos: getVisibleTodos(state.todos, state.visibilityFilter),
      visibilityFilter: state.visibilityFilter
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
