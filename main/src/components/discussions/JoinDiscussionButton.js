import React from 'react';

const JoinDiscussionButton = (props) => {

    if (props.requested) {
        return (
            <>
            <button className='btn btn-outline-primary' disabled>Pending</button>
            </>
        )
    }

    return (
    <>
     <button className='btn btn-outline-primary' onClick={props.request}>Join</button>
    </>
    )
}

export default JoinDiscussionButton;