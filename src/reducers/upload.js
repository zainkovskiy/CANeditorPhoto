import { handleActions } from "redux-actions";
import { Map, fromJS, List } from 'immutable';

import { newPhoto, edit, clear, change, removePhoto } from 'actions/upload';

const initialState = new Map({
  isOpenEdit: false,
  newPhoto: new List()
})

export const uploadReducer = handleActions({
  [newPhoto]: (state, action) => {
    return state.mergeIn(['newPhoto'], fromJS(action.payload))
  },
  [edit]: (state, action) => {
    return state.set('isOpenEdit', !state.get('isOpenEdit'));
  },
  [clear]: (state, action) => {
    return state.set('newPhoto', new List());
  },
  [change]: (state, action) => {
    const changes = action.payload;
    const currentArr = state.get('newPhoto').toJS();
    currentArr[changes.order].URL = changes.newUrl;
    if (changes.action === 'cut'){
      currentArr[changes.order].height = changes.height;
      currentArr[changes.order].width = changes.width;
    }
    return state.set('newPhoto', fromJS(currentArr))
  },
  [removePhoto]: (state, action) => {
    return state.set('newPhoto', state.get('newPhoto').delete(action.payload))
  }
}, initialState)