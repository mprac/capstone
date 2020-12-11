import React from 'react';
import DiscussionsSidebarList from './DiscussionsSidebarList';

const DiscussionsSidebar = (props) => 

<div className="col-md-3">
<h2>Discover</h2>
<ul className="list-group">
  {/* maps over categories to pass to the category list in disucssions page */}
    {props.categories.map(category => {
      return(
        <DiscussionsSidebarList 
          {...category}
          getDiscussions={e => props.getDiscussions(category.category)}
          activeCategory={props.activeCategory}
        />
      )
    })}
 
</ul>
</div>

export default DiscussionsSidebar;