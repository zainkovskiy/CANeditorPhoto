import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getComment, sendCommit, save, status } from 'actions/comment';

import { Comment } from 'components/Comment';

class CommentContainer extends PureComponent{
  componentDidMount(){
    const { getComment } = this.props;
    getComment()
  }

  handelClick = (bool, description) => {
    const { save, sendCommit, comment, status } = this.props;
    const prevComment = comment.reqComment;
    if (bool && description !== prevComment){
      save();
      sendCommit(description);
      status();
    }
  }

  render(){
    const { comment, isLinear, isSave} = this.props;
    return(
      <>
      { !isLinear && 
        <Comment 
          comment={ comment }
          isSave={ isSave }
          handelClick={ this.handelClick }
        />
      }
      </>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    isLinear: state.photo.get('isLinear'),
    comment: state.comment.get('comment').toJS(),
    isSave: state.comment.get('isSave'),
  }
}

function mapDispatchToProps(dispatch){
  return{
    getComment: () => dispatch(getComment()),
    sendCommit: (comment) => dispatch(sendCommit(comment)),
    save: () => dispatch(save()),
    status: () => dispatch(status()),
  }
}

export const CommentRedux = connect(mapStateToProps, mapDispatchToProps)(CommentContainer);


