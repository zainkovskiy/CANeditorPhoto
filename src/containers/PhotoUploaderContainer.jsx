import React, { PureComponent } from 'react';
import Button from '@mui/material/Button';

import { connect } from 'react-redux';

import { upload, edit, clear, turn, removePhoto, setCropImg, sendNew } from 'actions/upload';
import { loader, download } from 'actions/photo';

import { Uploader } from 'components/Uploader';
import { EditNewPhoto } from 'components/EdittNewPhoto';
import { Crop } from 'components/Crop';

export class PhotoUploaderContainer extends PureComponent{
  state = {
    isOpenCrop: false,
    cropPhoto: '',
    cropPhotoOrder: '',
  }
  handleChange = (event) => {
    const { upload, loader } = this.props;
    loader();
    upload(event.target.files, event.target.id);
  }
  dragEntertHandler = (event) => {
    event.preventDefault();
    if (event.target.classList.contains('uploader')) {
      event.target.style.background = "#E5E5E5";
    }
  }
  dragLeaveHandler = (event) => {
    event.preventDefault();
    if (event.target.classList.contains('uploader')) {
      event.target.style.background = "";
    }
  }
  dragOverHandler = (event) => {
    event.preventDefault();
    if (event.target.classList.contains('uploader')) {
      event.target.style.background = "#E5E5E5";
    }
  }
  dropHandler = (event) => {
    const { upload, loader } = this.props;
    event.preventDefault();
    loader();
    upload(event.dataTransfer.files, 'uploader');
  }

  closeEditField = () => {
    const { edit, clear } = this.props;
      edit();
      clear();
  }

  turnPhoto = (url, direction, order) => {
    const { turn } = this.props;
    turn(url, direction, order);
  } 
  deletePhoto = (order) => {
    const { removePhoto } = this.props;
    removePhoto(order);
  }

  handleCrop = (photo, order) => {
    this.toggleCrop()
    this.setState({cropPhoto: photo, cropPhotoOrder: order})
  }

  cropValue = (crop) => {
    const { setCropImg } = this.props; 
    const { cropPhoto, cropPhotoOrder } = this.state;
    const currentImg = document.querySelector('.crop').querySelector('IMG');
    const newSize = [];
    newSize.push((cropPhoto.width * crop.x / currentImg.offsetWidth).toFixed(0));
    newSize.push((cropPhoto.height * crop.y / currentImg.offsetHeight).toFixed(0));
    newSize.push((cropPhoto.width * crop.width / currentImg.offsetWidth).toFixed(0));
    newSize.push((cropPhoto.height * crop.height / currentImg.offsetHeight).toFixed(0));
    setCropImg(newSize, cropPhoto.URL, cropPhotoOrder);
    this.toggleCrop();
    this.setState({cropPhoto: '', cropPhotoOrder: ''})
  }

  toggleCrop = () => {
    this.setState({isOpenCrop: !this.state.isOpenCrop})
  }

  checkRightPhoto = (photo) => {
    return (photo.height >= 800 || photo.width >= 800) && photo.allowFormat;
  }

  sendToServer = () => {
    const { newPhoto, sendNew, loader, download } = this.props;
    const rightPhoto = [];
    loader();
    for (let photo of newPhoto){
      if (this.checkRightPhoto(photo)){
        rightPhoto.push(photo)
      }
    }
    sendNew(rightPhoto);
    download('update')
    this.closeEditField();
  }

  render(){
    const { newPhoto, isLinear, isUploading, isOpenEdit, notUploadet } = this.props;
    return(
      <>
        { 
          !isLinear && 
          <Uploader 
            handleChange={this.handleChange}
            dragEntertHandler={this.dragEntertHandler}
            dragLeaveHandler={this.dragLeaveHandler}
            dragOverHandler={this.dragOverHandler}
            dropHandler={this.dropHandler}
            isUploading={isUploading}
            notUploadet={notUploadet}
          />
        }
        {
          isOpenEdit &&
          <EditNewPhoto 
            newPhoto={ newPhoto }
            closeEditField={ this.closeEditField }
            handleChange={this.handleChange}
            isLinear={isLinear}
            turnPhoto={this.turnPhoto}
            deletePhoto={this.deletePhoto}
            handleCrop={this.handleCrop}
            sendToServer={this.sendToServer}
          />
        }
        {
          this.state.isOpenCrop && 
          <Crop 
            photo={this.state.cropPhoto}
            toggleCrop={this.toggleCrop}
            cropValue={this.cropValue}
          />
        }
      </>
    ) 
  }
  componentDidUpdate(prevProps, prevState){
    const { isUploading, download } = this.props;
    if (isUploading !== prevProps.isUploading){
      if (isUploading) {
        this.timer = setInterval(() => {
          download('update')
        }, 5000)
      } else {
        clearInterval(this.timer)
      }
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isLinear: state.photo.get('isLinear'),
    isUploading: state.photo.get('object').toJS().isUploading,
    notUploadet: state.photo.get('object').toJS().notUploadet,
    newPhoto: state.upload.get('newPhoto').toJS(),
    isOpenEdit: state.upload.get('isOpenEdit'),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    upload: (files, id) => dispatch(upload(files, id)),
    turn: (url, direction, order) => dispatch(turn(url, direction, order)),
    edit: () => dispatch(edit()),
    clear: () => dispatch(clear()),
    loader: () => dispatch(loader()),
    download: (action, servertime) => dispatch(download(action, servertime)),
    removePhoto: (order) => dispatch(removePhoto(order)),
    setCropImg: (values, url, order) => dispatch(setCropImg(values, url, order)),
    sendNew: (data) => dispatch(sendNew(data)),
  }
}

export const PhotoUploaderRedux = connect(mapStateToProps, mapDispatchToProps)(PhotoUploaderContainer);