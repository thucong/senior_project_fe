import { combineReducers } from 'redux';
import hide_header from './hide_header';
import choice_place from './choice_place';
import role from './role';
import list_hashtag from './list_hashtag';
import list_place from './list_place';
const appReducers = combineReducers({
    hide_header,
    choice_place,
    role,
    list_hashtag,
    list_place,
});
export default appReducers;