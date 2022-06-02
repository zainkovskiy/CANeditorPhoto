import React, { Component } from "react";
import CircularProgress from '@mui/material/CircularProgress';

import './Uploader.scss';



export class Uploader extends Component {
  render() {
    const { handleChange, dragEntertHandler, dragLeaveHandler, dragOverHandler, dropHandler, isUploading, notUploadet } = this.props;
    return (
      <>
        {isUploading ?
          <div className="uploader">
            <span className="uploader__text">{!Number.isInteger(notUploadet) ? notUploadet : `Осталось загрузить ${notUploadet} фото...`} </span>
            <CircularProgress />
          </div> :
          <div
            className="uploader"
            onDragEnter={event => dragEntertHandler(event)}
            onDragLeave={event => dragLeaveHandler(event)}
            onDragOver={event => dragOverHandler(event)}
            onDrop={event => dropHandler(event)}
            onChange={event => handleChange(event)}
          >
            <input
              className="uploader__input"
              id="uploader"
              type="file"
              multiple={true}
            />
            <label className="uploader__label" htmlFor="uploader"></label>
            <span className="uploader__text">Загрузить фото</span>
          </div>
        }
      </>
    )
  }
}