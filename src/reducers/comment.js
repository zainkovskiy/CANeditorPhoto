import { handleActions } from "redux-actions";
import { fromJS, Map } from "immutable";

import { setComment, save, status } from "actions/comment"; 

const initialState = new Map({
  isSave: false,
  comment: new Map(),
})

export const commentReducer = handleActions({
  [setComment]: (state, action) => {
    console.log(state);
    console.log(action);
    return state.set('comment', fromJS(action.payload));
  },
  [save]: (state, action) => {
    return state.set('isSave', !state.get('isSave'));
  },
  [status]: (state, action) => {
    return state.setIn(['comment', 'commentOk'], false);
  }
}, initialState);