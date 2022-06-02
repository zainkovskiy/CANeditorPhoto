import React from 'react';

import './NewPhoto.scss';

export function NewPhoto (props){
  const { photo, turnPhoto, order, deletePhoto, handleCrop } = props;

  const isValid = isValidPhoto(photo);

  function isValidPhoto (photo) {
    if (!photo.allowFormat){
      return {
        class: '',
        text: 'недопустимый формат',
        reason: 'format',
      }
    } else if (photo.height < 800 && photo.width < 800){
      return {
        class: '',
        text: 'недопустимый размер фото',
        reason: 'size',
      }
    } else {
      return {
        class: 'inVisible',
        text: '',
        reason: '',
      }
    }
  }

  return(
    <div className='new'> 
      <img 
        className='new__img'
        src={ isValid.reason === 'format' ? 'https://crm.centralnoe.ru/dealincom/assets/img/stop.jpg' : photo.URL } 
        alt="photo" 
      />
      <div class="new__buttons"> 
        <span 
          title="повернуть влево" 
          className="new__btn new__btn_left"
          onClick={() => turnPhoto(photo.URL, 90, order)}
        ></span>
        <span 
          title="повернуть вправо" 
          className="new__btn new__btn_right"
          onClick={() => turnPhoto(photo.URL, 270, order)}
        ></span>
        <span 
          title="обрезать фото"
          className="new__btn new__btn_cut"
          onClick={() => handleCrop(photo, order)}
        ></span>
        <span 
          title="удалить фото" 
          className="new__btn new__btn_delete"
          onClick={() => deletePhoto(order)}
        ></span>
      </div>
      <div className={ `new_inValid ${isValid.class}` }> 
        <span className="new-text">{ isValid.text }</span>
      </div>
    </div>    
  )
}