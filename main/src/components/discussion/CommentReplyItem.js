import React from 'react';
import DeleteComment from './DeleteComment';
import Moment from 'react-moment';

const CommentReplyItem = (props) => {
    return (
        <>
         <div className="reply-list-item list-group-item flex-column align-items-start">
             <div className="d-flex w-100 justify-content-between">
               <h5 className="mb-1">{props.name}</h5>
               <small><Moment fromNow>{props.date}</Moment></small>
             </div>
             <p className="mb-1">{props.reply}</p>
             {props.user === props.name ? <DeleteComment deleteComment={() => props.deleteComment(props.reply_id, 'reply')} /> : ""}
             </div>
        </>
    )
}

export default CommentReplyItem;