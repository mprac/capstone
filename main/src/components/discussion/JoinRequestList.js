import React, { Component } from 'react';
import JoinRequestListItem from './JoinRequestListItem';

class JoinRequestList extends Component {


  render() {
    if (this.props.requests.length !== 0) {
      return (
        <>
          <ul className="list-group">
            <h3>Pending requests</h3>
            {/* maps over requests and passes request to list item component */}
            {this.props.requests.map(request => {
              return (
                <JoinRequestListItem
                  {...request}
                  key={request.id}
                  handleDecision={(decision) => this.props.handleDecision(request.discussion_id, request.object_id, request.name, decision)}
                />
              )
            })}

          </ul>
        </>
      )
    }
    return (
      <>
        <ul className="list-group">
          <h3>Pending requests</h3>
          <p>0 Requests</p>
        </ul>
      </>
    )
  }

}



export default JoinRequestList;