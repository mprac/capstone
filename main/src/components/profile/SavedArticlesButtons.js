import React, { Component } from 'react';
import StartDiscussion from '../buttons/StartDiscussion';
import DeleteButton from '../buttons/DeleteButton'

class SavedArticlesButtons extends Component {
    render() {
        return(
            <>
            <DeleteButton Delete={() => this.props.handleDelete(this.props.object_id)} />
            <StartDiscussion url={this.props.url} category={this.props.category} />
            </>
        )
    }
}

export default SavedArticlesButtons;