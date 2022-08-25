import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

import './Comment.scss';

export function Comment(props) {
  const { comment, isSave, handelClick } = props;
  const [description, setDescription] = useState(comment.reqComment ? comment.reqComment : '');
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);

  const handle = () => {
    const regExp = new RegExp('залог', 'i')
    const regExp1 = new RegExp('залоге', 'i')
    const regExp2 = new RegExp('задаток', 'i')
    const regExp3 = new RegExp('задатке', 'i')
    if (edit) {
      if (regExp.test(description) || regExp1.test(description) || regExp2.test(description) || regExp3.test(description)) {
        setError(true);
      } else {
        handelClick(edit, description);
        setError(false);
        setEdit(!edit)
      }
    } else {
      setEdit(!edit)
    }
  }

  return (
    <div className="comment">
      <div className="comment__header">
        <div className='comment__header_wrap'>
          <span className={`comment__status ${comment.commentOk ? 'comment__status_approved' : 'comment__status_denied'}`}></span>
          <span className='comment__title'>Описание {comment.commentOk ? '' : 'не'} одобрено</span>
        </div>
        {error && <span className='comment__title comment__error'>не допустимые слова: "залог/задаток"</span>}
        <LoadingButton
          size="small"
          variant="contained"
          loading={isSave}
          onClick={handle}
        >
          {edit ? 'сохранить комментарий' : 'редактировать комментарий'}
        </LoadingButton>
      </div>
      <textarea
        className='comment__field'
        cols="30"
        rows="10"
        value={description.split('*').join('').replace(/EOL/g, '\n')}
        onChange={event => setDescription(event.target.value)}
        disabled={!edit}
      ></textarea>
    </div>
  )
}
