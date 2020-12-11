import React from 'react';
import Card from './Card';

const CardList = props => {
    return (
        <div className="row row-cols-1 row-cols-md-3">
            {/* gets filter result and applies it to filter before passing articles the lists */}
        {props.news
        .filter(article => !props.isFiltered || (article.title.toLowerCase().includes(props.searchResult.toLowerCase())))
        .map(article => {
                return (
                    <Card 
                    {...article}
                    key={article.id}
                    />
                )
            })}
        </div>
    );
}

export default CardList;


