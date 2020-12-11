import React, { Component } from 'react';
import DeleteButton from '../buttons/DeleteButton';
import GoToDiscussionButton from '../buttons/GoToDiscussionButton';

class YourDiscussionsButtons extends Component {
    handleGoToDiscussion() {
        const url = '/discussion/' + this.props.object_id;
        document.location.href = url;
    }

    render() {
        return (
            <>
                <DeleteButton Delete={() => this.props.handleDelete(this.props.object_id)} />
                <GoToDiscussionButton GoToDiscussion={() => this.handleGoToDiscussion()} />
            </>
        )
    }

}

export default YourDiscussionsButtons;