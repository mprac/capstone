import React, { useState } from 'react';

function CommentBox(props) {

    const [comment, setComment] = useState("")

    return(
    <>
    <div className="row mt-5">
    <div className="input-group mt-5 fixed-bottom">
      <input type="text" className="form-control" placeholder="Enter comment" onChange={(e) => setComment(e.target.value)} value={comment}/>
      <div className="input-group-append">
        <button className="btn btn-outline-primary" type="button" onClick={() => 
          {props.handleSubmit(comment)
          setComment("")
          }}>Submit</button>
      </div>
    </div>
  </div>

  </>
)

}

export default CommentBox;