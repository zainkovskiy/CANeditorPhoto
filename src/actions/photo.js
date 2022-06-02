import { createAction } from "redux-actions";

export const loader = createAction('[Photo] loader');
export const load = createAction('[Photo] load');
export const change = createAction('[Photo] change');
export const swap = createAction('[Photo] swap');
export const web = createAction('[Photo] web');


let serverTime = '';
export function download(action){
  return function (dispatch){
    fetch('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/MediaExchange/Controller.php', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action: action, 
        reqNumber: reqNumber,
        servertime: serverTime,
        userId: userId
      })
    }).then(res =>{
      res.json().then(data => {
        serverTime = data.servertime;
        console.log(data);
        if (action === 'update') {
          data.old = data.old.concat(data.new);
          dispatch(load(data));
        } else if (action === 'get'){
          dispatch(load(data));
          dispatch(loader())
        }        
      })
    })
  }
}

export function save(data){
  return function(dispatch){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/MediaExchange/Controller.php', true);
    xhr.responseType = 'json';
    data.method = 'set';
    xhr.send(JSON.stringify(data));
    xhr.onload = () => {
      dispatch(loader())
      console.log(xhr.response);
    }
  }
}

export function moderator(){
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/MediaExchange/Controller.php', true);
  xhr.responseType = 'json';
  xhr.send(JSON.stringify({
    action: 'onModeration', 
    reqNumber: reqNumber,
  }));
  xhr.onload = () => {
    console.log(xhr.response);
  }
}