import { combineReducers } from 'redux';
import hide_header from './hide_header';

import role from './role';


const appReducers = combineReducers({
    hide_header,
    role,
});
export default appReducers;