import todos from './todo';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import visibilityFilter from './FilterReducer'

const rootReducer = combineReducers({
    todos,
    visibilityFilter,
    form: formReducer
});
export default rootReducer;
