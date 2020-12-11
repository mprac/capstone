import React, { Component } from 'react';
import MemberListItem from './MemberListItem';

class MembersList extends Component {

    render() {
        if (this.props.members.length !== 0) {
            return (
                <>
                    <ul className="list-group">
                        <h3>Members</h3>
                        {/* maps over members and passes each member to list item */}
                        {this.props.members.map((member, index) => {
                            return (

                                <MemberListItem
                                    {...member}
                                    key={index}
                                    deleteMember={(id) => this.props.deleteMember(member.object_id)}
                                />

                            )
                        })}
                    </ul>
                </>
            )

        }
        return (
            <>
            </>
        )
    }
}

export default MembersList;