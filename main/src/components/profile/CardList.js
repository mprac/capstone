import React from 'react';
import Card from './Card';

const CardList = props => {

    return (
      <>
      {/* maps over items in cards and passes the to list item */}
    {props.items
    .map(item => {
      return (
        <Card 
        {...item}
        key={item.id}
        type={props.type}
        handleDelete={(id) => props.handleDelete(id)}
        />
      )
    })}
    </>
    )

}

export default CardList;