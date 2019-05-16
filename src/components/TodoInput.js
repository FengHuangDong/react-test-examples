import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

export class TodoInput extends Component {

  render() {
    const { handleSubmit } = this.props
    return (
      <div className="form-group row">
        <div className="col-sm-10">
          <form className="form-inline" onSubmit={ handleSubmit }>
            <Field className="form-control"  placeholder="add todo here" name="title" component="input" type="text" />
            <button style={{marginLeft:"10px"}} className="btn btn-success" type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}


export default reduxForm({
  // a unique name for the form
  form: 'todo'
})(TodoInput);
