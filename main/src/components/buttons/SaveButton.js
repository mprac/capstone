import React from 'react';

const SaveButton = (props) =>

<button type="button" className="btn btn-outline-primary btn-md" onClick={props.saveOne}><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
              </svg></button>;

export default SaveButton;