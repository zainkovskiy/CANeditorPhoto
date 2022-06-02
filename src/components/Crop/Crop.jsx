import React, { useState } from 'react';
import ReactCrop from "react-image-crop";
import Button from '@mui/material/Button';
import "react-image-crop/dist/ReactCrop.css";

import './Crop.scss';

export function Crop (props) {
  const { photo, toggleCrop, cropValue } = props; 
  const [crop, setCrop] = useState({
    height: 0,
    width: 0
  });

  return(
    <div className='crop'> 
      <span className='crop__text'>Высота { crop.height.toFixed(0) }px, ширина { crop.width.toFixed(0) }px</span>
      <ReactCrop crop={crop} onChange={c => setCrop(c)}>
        <img src={ photo.URL } />
      </ReactCrop>
      <div className="crop__bottom"> 
        <span className='crop__text'>Размер обрезанного изображения не должен быть меньше 800 пикселей</span>
        <div className='crop__buttons'>
          <Button
            size="medium"
            variant="contained"
            disabled={crop.height < 800 && crop.width < 800}
            onClick={() => cropValue(crop)}
          >
            Принять
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="error"
            onClick={ toggleCrop }
          >
            Закрыть
          </Button>
        </div>
      </div> 
    </div>
  )
}