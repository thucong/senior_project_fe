import { combineReducers } from 'redux';
import hide_header from './hide_header';
import choice_place from './choice_place';
import role from './role';
import list_hashtag from './list_hashtag';

const appReducers = combineReducers({
    hide_header,
    choice_place,
    role,
    list_hashtag,
});
export default appReducers;