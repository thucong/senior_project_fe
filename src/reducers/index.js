import { combineReducers } from 'redux';
import hide_header from './hide_header';
import choice_place from './choice_place';
import role from './role';
import list_hashtag from './list_hashtag';
import list_place from './list_place';
import list_time from './list_time';
import choice_date from './choice_date';
const appReducers = combineReducers({
    hide_header,
    choice_place,
    role,
    list_hashtag,
    list_place,
    list_time,
    choice_date,
});
export default appReducers;