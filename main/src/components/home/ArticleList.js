import React from 'react';
import Article from './Article';

const ArticleList = props => {
    return (
        <div className="container">
            <h2 className="text-center grey mb-3">Join The Discussion</h2>
            {props.articles.map(article => {
                return (
                    <Article
                        {...article}
                        key={article.id}
                    />
                )
            })}
        </div>

    );
}

export default ArticleList;