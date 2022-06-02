import React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import GetAppIcon from "@mui/icons-material/GetApp";

import './DialogPhoto.scss'

export function DialogPhoto(props){
  const { photo } = props;  
  return (
    <>
    <div className="paper">
      <img
        src={photo.URL}
        className='paper__img'
      />
    </div>
    <DialogActions>
      <Button
        endIcon={<GetAppIcon/>}
        href='#'
        target="_blank"
        download={photo.URL}
        variant="text"
      >
        Скачать
      </Button>
    </DialogActions>
    </>
  )
}