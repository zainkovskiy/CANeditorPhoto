import { createAction } from "redux-actions";

import { loader } from 'actions/photo'; 

export const newPhoto = createAction('[Upload], newPhoto')
export const edit = createAction('[Upload], edit')
export const clear = createAction('[Upload], clear')
export const change = createAction('[Upload], change')
export const removePhoto = createAction('[Upload], removePhoto')

export function upload(files, id){
  return function (dispatch){
    const data = new FormData();
    for(let file of files){
      data.append('photo[]', file);
    }
    data.append('reqNumber', reqNumber)

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/MediaExchange/Uploader.php', true);
    xhr.responseType = 'json';
    xhr.send(data);
    xhr.onload = () => {
      dispatch(newPhoto(xhr.response))
      dispatch(loader())
      id === 'uploader' && dispatch(edit())
    }
  }
}
export function turn(url, direction, order){
  return function (dispatch){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://hs-01.centralnoe.ru/Project-Selket-Main//Servers/MediaExchange/PhotoWorker.php', true);
    xhr.responseType = 'json';
    xhr.send(JSON.stringify({
      URL: url,
      Turn: direction,
      reqNumber: reqNumber,
    }));
    xhr.onload = () => {
      dispatch(change({
        action: 'turn',
        order: order,
        newUrl: xhr.response[0]
      }))
    }
  }
}
export function setCropImg (values, url, order){
  return function (dispatch){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://hs-01.centralnoe.ru/Project-Selket-Main//Servers/MediaExchange/PhotoWorker.php', true);
    xhr.responseType = 'json';
    xhr.send(JSON.stringify({
     URL: url,
     Crop: values,
    }));
    xhr.onload = () => {
      dispatch(change({
        action: 'cut',
        order: order,
        newUrl: xhr.response.URL,
        height: xhr.response.height,
        width: xhr.response.width
      }))
    }
  }
} 

export function sendNew(data) {
  return function (dispatch){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://hs-01.centralnoe.ru/Project-Selket-Main//Servers/MediaExchange/PhotoWorker.php', true);
    xhr.responseType = 'json';
    xhr.send(JSON.stringify({
      reqNumber: reqNumber,
      author: userId,
      Finish: data
    }));
    xhr.onload = () => {
      dispatch(loader())
      console.log(xhr.response);
    }
  }
}

