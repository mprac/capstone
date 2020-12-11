import React from 'react';

const GoToDiscussionButton = (props) =>

<button type="button" className="btn btn-outline-primary btn-md" href="" onClick={props.GoToDiscussion}><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"/>
</svg></button>;

export default GoToDiscussionButton;