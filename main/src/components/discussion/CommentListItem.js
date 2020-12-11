import React, { useState } from 'react';
import CommentReplyItem from './CommentReplyItem';
import DeleteComment from './DeleteComment';
import Moment from 'react-moment';

const CommentListItem = (props) => {

  const [replying, setReplying] = useState(false);
  const [reply, setReply] = useState("");
  const [limit, setLimit] = useState(3);

  if (props.replys.length !== 0) {
    return (
      <>
        <div className="list-group-item flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{props.name}</h5>
            <small><Moment fromNow>{props.date}</Moment></small>
          </div>
          <p className="mb-1">{props.comment}</p>
          {/* check if logged in user wrote this comment to show delete option */}
          {props.user === props.name ?
            <DeleteComment
              deleteComment={() => props.deleteComment(props.comment_id, 'comment')}
            /> : ""} <small onClick={() => setReplying(!replying)}>{replying ? 'X' : <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-reply" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.502 5.013a.144.144 0 0 0-.202.134V6.3a.5.5 0 0 1-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876C3.925 10.515 5.09 9.982 6.11 9.7a8.741 8.741 0 0 1 1.921-.306 7.403 7.403 0 0 1 .798.008h.013l.005.001h.001L8.8 9.9l.05-.498a.5.5 0 0 1 .45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.494.494 0 0 1 .042-.028.147.147 0 0 0 0-.252.494.494 0 0 1-.042-.028L9.502 5.013zM8.3 10.386a7.745 7.745 0 0 0-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 0 1-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.667z" />
            </svg>}</small> <small data-toggle="collapse" href={"#this" + props.index}><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrows-collapse" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0zm-.5 11.707l-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793z" />
            </svg></small>
          {/* if user is replying activate reply text input */}
          {replying ?

            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="reply here" value={reply ? reply : ""} onChange={(e) => setReply(e.target.value)} autoFocus />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={() => {
                  props.handleReply(reply)
                  setReply("")
                }}>Reply</button>
              </div>
            </div>

            : ''}
          <div className="collapse pl-5" id={"this" + props.index}>
            {props.replys.slice(0, limit).map((reply, index) => {
              return (
                <CommentReplyItem
                  {...reply}
                  key={index}
                  user={props.user}
                  deleteComment={(id, type) => props.deleteComment(id, type)}
                />
              )
            })}
            {props.replys.length > limit ? <button className="btn btn-outline-primary mt-3 mb-3" onClick={() => setLimit(limit + 5)}>Load More</button> : ''}
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="list-group-item flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{props.name}</h5>
          <small><Moment fromNow>{props.date}</Moment></small>
        </div>
        <p className="mb-1">{props.comment}</p>
        {/* check if logged in user wrote this comment to show delete option */}
        {props.user === props.name ? <DeleteComment deleteComment={() => props.deleteComment(props.comment_id, 'comment')} /> : ""} <small onClick={() => setReplying(!replying)}>{replying ? 'X' : <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-reply" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.502 5.013a.144.144 0 0 0-.202.134V6.3a.5.5 0 0 1-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876C3.925 10.515 5.09 9.982 6.11 9.7a8.741 8.741 0 0 1 1.921-.306 7.403 7.403 0 0 1 .798.008h.013l.005.001h.001L8.8 9.9l.05-.498a.5.5 0 0 1 .45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.494.494 0 0 1 .042-.028.147.147 0 0 0 0-.252.494.494 0 0 1-.042-.028L9.502 5.013zM8.3 10.386a7.745 7.745 0 0 0-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 0 1-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.667z" />
        </svg>}</small>
        {/* if user is replying activate reply text input */}
        {replying ?
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="reply here" value={reply ? reply : ""} onChange={(e) => setReply(e.target.value)} autoFocus />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={() => {
                props.handleReply(reply)
                setReply("")
              }}>Reply</button>
            </div>
          </div>
          : ''}
      </div>
    </>
  )
}



export default CommentListItem;