import React, { Component, useState } from 'react';
import CommentListItem from './CommentListItem';

class CommentList extends Component {
 
    render() {
        if(this.props.comments.length !== 0) {
            return (
                <>
                <h3>{this.props.comments.length} Comments</h3>
                <div className="list-group">
                    {this.props.comments.slice(0,this.props.limit).map((comment, index) => {
                        return(
                            <CommentListItem 
                            {...comment}
                            key={index}
                            index={index}
                            replys={comment.replys}
                            handleReply={(e) => this.props.handleReply(e, comment.comment_id)}
                            user={this.props.user}
                            deleteComment={(id,type) => this.props.deleteComment(id,type)}
                            />
                            
                        )
                    } 
                   
                        )}
                </div>
                {this.props.comments.length > this.props.limit ? <button className="btn btn-outline-primary mt-2" onClick={this.props.loadmore}>Load More</button> : ''}
                
               
                </>
            )
        }
        return (
            <>
            <h3>Comments</h3>
            <p>0 Comments</p>
            </>
        )
    }
}

export default CommentList;

