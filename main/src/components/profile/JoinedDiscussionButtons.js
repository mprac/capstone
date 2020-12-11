import React, { Component } from 'react';
import GoToDiscussionButton from '../buttons/GoToDiscussionButton';

class JoinedDiscussionButtons extends Component {


render() {
    return (
        <> 
        <GoToDiscussionButton GoToDiscussion={this.props.GoToDiscussion} />
        <button className="btn btn-outline-primary" onClick={this.props.handleDelete}>Leave</button>
        </>
    )
}

}

export default JoinedDiscussionButtons;