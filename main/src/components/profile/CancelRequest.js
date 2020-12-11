import React, { Component } from 'react';

class CancelRequest extends Component {
    render() {

        return (
            <>
                <button className="btn btn-outline-primary" onClick={this.props.handleDelete}>Cancel</button>
            </>
        )
    }

}

export default CancelRequest;