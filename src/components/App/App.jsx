import React from 'react';
import { Provider } from 'react-redux';

import { Header } from 'components/Header';
import { Title } from 'components/Title';
import { PhotoFieldRedux } from 'containers/PhotoFieldContainer';
import { PhotoUploaderRedux } from 'containers/PhotoUploaderContainer';
import { CommentRedux } from 'containers/CommentContainer';

import { store } from '../../store';

import './App.scss';

export function App() {
  return (
    <>
      <Header/>
      <Title/>
      <Provider store={store}>
        <CommentRedux/>
        <PhotoUploaderRedux/>
        <PhotoFieldRedux/>
      </Provider>
    </>
  )   
}