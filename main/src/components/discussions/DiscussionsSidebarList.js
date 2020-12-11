import React from 'react';

const DiscussionsSidebarList = (props) => {

    if (props.activeCategory === props.category) {
        return (
            <>
            <li className='list-group-item list-group-item-action active'
            >{props.category}</li>
            </>
        )
    }
    
    return (
        <>
        <li className={'list-group-item list-group-item-action ' + 'text-'+props.category.toLowerCase()} onClick={props.getDiscussions}>{props.category}</li>
        </>
    )

   

}


export default DiscussionsSidebarList;