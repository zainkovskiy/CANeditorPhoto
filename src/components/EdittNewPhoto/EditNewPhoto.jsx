import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import './EditNewPhoto.scss';

import { NewPhoto } from 'components/NewPhoto';

export function EditNewPhoto (props){
    const { newPhoto, closeEditField, handleChange, isLinear, turnPhoto, deletePhoto, handleCrop, sendToServer } = props;

    useEffect(() => {
      document.querySelector('HTML').setAttribute('style', 'overflow: hidden');
      return () => {
        document.querySelector('HTML').removeAttribute('style');
      }
    })

    return(
      <div className='edit' 
      > 
        <div className='edit__window'> 
        {
          newPhoto.map((photo, idx) => 
          <NewPhoto 
          key={idx} 
          photo={photo}
          turnPhoto={turnPhoto} 
          deletePhoto={deletePhoto}
          order={idx}
          handleCrop={handleCrop}
          />)
        }
        <div className='uploader edit__uploader'> 
          { 
            isLinear ? 
            <CircularProgress/> :
            <> 
              <input 
                className='uploader__input' 
                type="file" 
                id="file"
                multiple={true}
                onChange={(event) => handleChange(event)}
              />
              <label className="uploader__label" htmlFor='file'></label>
              <span className="uploader__text">Загрузить фото</span>
            </> 
          }   
        </div> 
        </div>
        <div className="edit__footer"> 
            <span className="edit__attention"> ВНИМАНИЕ! В том случае, если Вы загружаете фото с видимыми водяными знаками и/или чужих объектов, ответственность о непрохождении модерации и/или отсутствию в рекламе Вы берёте на себя.</span>
            <div className='edit__footer-buttons'> 
              <Button
                size="medium"
                variant="contained"
                onClick={ sendToServer }
              >
                Сохранить
              </Button>
              <Button
                size="medium"
                variant="contained"
                color="error"
                onClick={ () => closeEditField() }
              >
                Закрыть
              </Button>
            </div>
          </div>
      </div>
    )
}