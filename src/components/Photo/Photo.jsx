import React from "react";

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';

import './Photo.scss';

export function Photo (props){
  const { photo, setOpenPhoto, handleChange, dragStartHandler, dragEndHandler, dragOverHandler, dropHandler, isUploading } = props;

  return(
    <div 
      className="photo"
      draggable={ true }
      onDragStart={event => dragStartHandler(event, photo)}
      onDragLeave={event => dragEndHandler(event)}
      onDragEnd={event => dragEndHandler(event)}
      onDragOver={event => dragOverHandler(event)}
      onDrop={event => dropHandler(event, photo)}
    >
      <span className={`photo__mod photo__mod_${ photo.mod }`}></span>
      <img className="photo__img" 
      onDoubleClick={() => setOpenPhoto(photo)}
      src={ photo.URL } alt="photo" />
      {
        isUploading ? 
        <Skeleton variant="rectangular" height={124} width={285} animation="wave"/> :
        
      <div className="photo__bottom"> 
      <label className="photo__check" htmlFor={`main${photo.UID}`}>
        Лучшее 
        <input 
          type="checkbox"
          checked={photo.main}
          name='main'
          id={`main${photo.UID}`}
          onChange={event => handleChange(event, photo.UID)}
        />
      </label>
      <label className="photo__check" htmlFor={`web${photo.UID}`}>
        Web
        <input 
          type="checkbox"
          checked={photo.web}
          name='web'
          id={`web${photo.UID}`}
          onChange={event => handleChange(event, photo.UID)}
        />
      </label>
        <Select 
          size='small'
          value={photo.type}
          onChange={event => handleChange(event, photo.UID)}
          name='type'
        > 
          <MenuItem value='Комнаты'>Комнаты</MenuItem>
          <MenuItem value='Сан. узел'>Сан. узел</MenuItem>
          <MenuItem value='Кухня'>Кухня</MenuItem>
          <MenuItem value='Вид из окна'>Вид из окна</MenuItem>
          <MenuItem value='Фасад'>Фасад</MenuItem>
          <MenuItem value='Планировка'>Планировка</MenuItem>
          <MenuItem value='Двор'>Двор</MenuItem>
          <MenuItem value='Подъезд'>Подъезд</MenuItem>
          <MenuItem value='Лестница'>Лестница</MenuItem>
          <MenuItem value='Прихожия'>Прихожая</MenuItem>
          <MenuItem value='Лоджия'>Лоджия</MenuItem>
        </Select>
        <p className={(photo.mod !== 'approved' && photo.modReason && photo.modReason.length > 0) ? 'photo__text' : 'photo__text photo__text_hide'}>Причина: 
          <span>{ photo.modReason }</span>
        </p>
      </div>
    }
    </div>
  )
} 