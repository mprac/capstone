import React from 'react';

const Article = props => {
    return (
        <>
                <div className="card mb-0 border">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src={props.urltoimage} className="card-img img-fluid" alt={props.title} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{props.title}</h5>
                                <p className="card-text mb-0">{props.description}</p>
                                <p className="card-text"><small className="text-muted"> by:{props.author}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Article;