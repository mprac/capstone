import React from 'react';
import AcceptButton from './AcceptButton';
import RejectButton from './RejectButton';

const JoinRequestListItem = (props) => {

    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                {props.name}
                <div className="btn-group" role="group">
                    <AcceptButton
                        handleAccept={() => props.handleDecision('true')}
                    />
                    <RejectButton
                        handleReject={() => props.handleDecision('false')}
                    />
                </div>
            </li>
        </>
    )
}

export default JoinRequestListItem;