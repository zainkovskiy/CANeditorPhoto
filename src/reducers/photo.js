import { handleActions } from "redux-actions"; 
import { Map, fromJS, List } from "immutable";

import { loader, load, change, swap, web } from 'actions/photo';

const initialState = new Map({
  isLinear: true,
  object: new Map()
}) 

export const photoReducer = handleActions({
  [loader]: (state, action) => {
    return state.set('isLinear', !state.get('isLinear'));
  },
  [load]: (state, action) => {
    console.log(action);
    return state.set('object', fromJS(action.payload))
  },
  [change]: (state, action) => {
    const event = action.payload.event;
    const uid = action.payload.uid;
    const currentList = state.get('object').toJS().old;
    currentList.map(photo => {
      if(photo.UID === uid){
        photo[event.target.name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value; 
      }
    })
    return state.setIn(['object', 'old'], fromJS(currentList));
  },
  [swap]: (state, action) => {
    const currentList = state.get('object').toJS().old;
    const start = currentList.find(item => item.UID === action.payload.start.UID);
    const end = currentList.find(item => item.UID === action.payload.end.UID);
    currentList.splice(currentList.indexOf(end), 0, ...currentList.splice(currentList.indexOf(start), 1))
    return state.setIn(['object', 'old'], fromJS(currentList));
  },
  [web]: (state, action) => {
    const currentList = state.get('object').toJS().old;
    currentList.forEach(el => {
      el.web = action.payload;
    });
    return state.setIn(['object', 'old'], fromJS(currentList));
  }
}, initialState)