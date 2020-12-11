import React from 'react';
import DiscussionsListItem from './DiscussionsListItem';

const DiscussionsList = (props) => {
    if (props.discussions.length !== 0) {
    
    return (
        <>
            <div className="row row-cols-1 row-cols-md-2">
                    {/* filters passed from discussions to activate instant search */}
                    {props.discussions
                    .filter(discussion => !props.isPrivate || discussion.private === props.isPrivate)
                    .filter(discussion => !props.isPublic || discussion.private === !props.isPublic)
                    .filter(discussion => !props.isFiltered || discussion.title.toLowerCase().includes(props.filterResult.toLowerCase()))
                    .map(discussion => {
                        return (
                        <DiscussionsListItem
                            {...discussion}
                            key={discussion.id}
                            request={(key,object_id) => props.request(key,object_id)}
                        />
                        )
                    })}
              
            </div>
        </>
    )}

    return(
        <>
        <div className='row'>
            <div className='col-12 text-center'>
            <h3>Select a category to start searching</h3>
            <p>No results</p>
            </div>
        </div>
        </>
    )
}

export default DiscussionsList