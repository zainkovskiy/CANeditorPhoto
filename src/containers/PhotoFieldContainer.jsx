import React, { PureComponent } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { connect } from 'react-redux';

import { Linear } from 'components/Linear';
import { Photo } from 'components/Photo';
import { DialogMain } from 'components/DialogMain';
import { DialogPhoto } from 'components/DialogPhoto';

import { download, change, swap, web, loader, save, moderator, deletePhoto, returnPhoto } from 'actions/photo';

class PhotoFieldContainer extends PureComponent {
  state = {
    currentDragPhoto: '',
    currentOpenPhoto: '',
    isOpenPhoto: false,
    changes: false,
    clickMod: false,
  }
  componentDidMount() {
    const { download } = this.props;
    download('get');
  }
  setOpenPhoto = (photo) => {
    this.setState({ currentOpenPhoto: photo }, () => {
      this.openDialog();
    });
  }
  openDialog = () => {
    this.setState({ isOpenPhoto: !this.state.isOpenPhoto }, () => {
      if (!this.state.isOpenPhoto) {
        this.setState({ currentOpenPhoto: '' });
      }
    });
  }
  handleChange = (event, uid) => {
    const { change } = this.props;
    change({ event: event, uid: uid })
    this.setState({ changes: true })
  }
  handelRemovePhoto = () => {
    this.setState({ changes: true })
  }
  dragStartHandler = (event, photo) => {
    //событие взятие карточки

    this.setState({ currentDragPhoto: photo })
  }
  dragEndHandler = (event) => {
    //отпустили перемещение
    event.target.classList.remove('photo_over');
  }
  dragOverHandler = (event) => {
    //местоположение над другой карточки
    event.preventDefault();
    event.target.classList.add('photo_over');
  }
  dropHandler = (event, photo) => {
    //отпустили карточку

    const { swap } = this.props;
    event.preventDefault();
    this.setState({ changes: true })
    swap({
      start: this.state.currentDragPhoto,
      end: photo
    });
    event.target.classList.remove('photo_over');
  }
  reload = () => {
    location.reload();
  }
  saveChange = () => {
    const { object, save, loader } = this.props;
    loader();
    save(object);
  }
  handleModeration = () => {
    const { sendOnModeration } = this.props;
    this.setState({ clickMod: true });
    sendOnModeration();
  }
  render() {
    const { isLinear, photos, web, isUploading, object, deletePhoto, returnPhoto } = this.props;
    return (
      <>
        {
          isLinear ?
            <Linear /> :
            <>
              {
                photos.length > 0 ?
                  <>
                    <div className='buttons'>
                      <div className="buttons__left">
                        <ButtonGroup variant="text" aria-label="text button group">
                          <Button
                            onClick={() => { web(true), this.setState({ changes: true }) }}
                          >Установить WEB
                          </Button>
                          <Button
                            onClick={() => { web(false), this.setState({ changes: true }) }}
                          >Снять WEB
                          </Button>
                          {
                            object.isGod &&
                            <Button
                              onClick={() => { returnPhoto(false), this.setState({ changes: true }) }}
                            >Вернуть удаленные
                            </Button>
                          }
                        </ButtonGroup>
                      </div>
                      <div className="buttons__right">
                        <Button
                          size="medium"
                          variant="contained"
                          color="error"
                          onClick={() => this.reload()}
                          disabled={!this.state.changes || isUploading}
                        >
                          Отменить
                        </Button>
                        <Button
                          size="medium"
                          variant="contained"
                          onClick={() => this.saveChange()}
                          disabled={!this.state.changes || isUploading}
                        >
                          Сохранить фото
                        </Button>
                        {
                          this.props.object.isGod &&
                          <Button
                            size="medium"
                            variant="outlined"
                            color="error"
                            onClick={() => this.handleModeration()}
                            disabled={this.state.clickMod}
                          >
                            на модерацию
                          </Button>
                        }
                      </div>
                    </div>
                    <div className='photo-field'>
                      {
                        photos.map(photo =>
                          (!photo.isDeleted && !object.isGod || object.isGod) &&
                          <Photo
                            key={photo.UID}
                            photo={photo}
                            setOpenPhoto={this.setOpenPhoto}
                            handleChange={this.handleChange}
                            dragStartHandler={this.dragStartHandler}
                            dragEndHandler={this.dragEndHandler}
                            dragOverHandler={this.dragOverHandler}
                            dropHandler={this.dropHandler}
                            isUploading={isUploading}
                            deletePhoto={deletePhoto}
                            handelRemovePhoto={this.handelRemovePhoto}
                          />
                        )
                      }
                    </div>
                  </> : <p className='photo__text'>Нет фото</p>
              }
              <DialogMain
                open={this.state.isOpenPhoto}
                onClose={this.openDialog}
                children={<DialogPhoto photo={this.state.currentOpenPhoto} />}
              />
            </>
        }
      </>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isLinear: state.photo.get('isLinear'),
    photos: state.photo.get('object').toJS().old,
    object: state.photo.get('object').toJS(),
    isUploading: state.photo.get('object').toJS().isUploading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    download: (action) => dispatch(download(action)),
    change: (input) => dispatch(change(input)),
    swap: (swapItems) => dispatch(swap(swapItems)),
    web: (checked) => dispatch(web(checked)),
    loader: () => dispatch(loader()),
    save: (object) => dispatch(save(object)),
    sendOnModeration: () => dispatch(moderator()),
    deletePhoto: (UID) => dispatch(deletePhoto(UID)),
    returnPhoto: (UID) => dispatch(returnPhoto(UID)),
  }
}

export const PhotoFieldRedux = connect(mapStateToProps, mapDispatchToProps)(PhotoFieldContainer)