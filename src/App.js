import React, { Component } from 'react';
import './App.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {addToList, fetchTodos} from './actions/todo';

import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

export class App extends Component {
  componentDidMount(){
    this.props.fetchTodos()
  }
  mySubmit(values) {
    this.props.addToList(values.title)
  }

  render() {
    return (
      <div className="APP">
        <div style={{ marginTop: "80px"}} className="col-lg-10 offset-lg-1 col-md-10 col-sm-12 col-xs-12">
          <TodoInput onSubmit={this.mySubmit.bind(this)}/>
          <TodoList/>
        </div>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => bindActionCreators({ addToList,fetchTodos }, dispatch)

export default connect(null, mapDispatchToProps)(App);
