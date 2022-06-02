import { createAction } from "redux-actions"

export const setComment = createAction('[Comment], setComment');
export const save = createAction('[Comment], save');
export const status = createAction('[Comment], status');

export function getComment(){
  return function(dispatch){
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        action: 'getComment',
        reqNumber: reqNumber
      })
    };
    fetch('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/MediaExchange/Controller.php', requestOptions).then(res => {
      res.json().then(data => {
        dispatch(setComment(data))
      })
    })
  }
}

export function sendCommit(comment){
  return function(dispatch){
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        action: 'setComment',
        reqComment: comment.replace(/\n/g, ` *EOL `),
        id: reqNumber,
      })
    };
    fetch('https://crm.centralnoe.ru/dealincom/factory/objectViewer.php', requestOptions).then(res => {
      res.json().then(data => {
        dispatch(save())
      })
    })
  }
}