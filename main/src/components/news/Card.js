import React from 'react';
import SaveArticle from '../buttons/SaveArticle';
import StartDiscussion from '../buttons/StartDiscussion';
import Moment from 'react-moment';

const Card = props => {

  return (
    <>
      <div className="col mb-4">
        <div className="card shadow rounded">
          <div className="view overlay">
            <img className="card-img-top" src={props.urlToImage}
              alt="Card image cap" />
            <a href={props.url}>
              <div className="mask rgba-white-slight"></div>
            </a>
          </div>
          <div className="card-body">
            <h4 className="card-title"><a href={props.url} target="_blank">{props.title}</a></h4>
            <p className="text-secondary">by: {props.author}</p>
            <p className="card-text">{props.description}</p>
            <div className="d-flex justify-content-between">
              <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                <SaveArticle
                  id={props.id}
                  author={props.author}
                  description={props.description}
                  name={props.name}
                  publishedAt={props.publishedAt}
                  title={props.title}
                  url={props.url}
                  urlToImage={props.urlToImage}
                  category={props.category}
                />
                <StartDiscussion
                  url={props.url}
                  category={props.category}
                />
              </div>
              <small className="text-secondary">Published <Moment fromNow>{props.publishedAt}</Moment></small>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card;