import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/news/App';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Discussions from './components/discussions/Discussions';
import Discussion from './components/discussion/Discussion';
import Create from './components/create/Create';

var app = document.getElementById('app');
var home = document.getElementById('home');
var profile = document.getElementById('profile');
var discussions = document.getElementById('discussions');
var discussion = document.getElementById('discussion');
var create = document.getElementById('create');

if (app) {
ReactDOM.render(<App />, document.querySelector("#app")); 
}
if (home) {
ReactDOM.render(<Home />, document.querySelector("#home"));  
}
if (profile) {
ReactDOM.render(<Profile />, document.querySelector("#profile"));  
}
if (discussions) {
ReactDOM.render(<Discussions />, document.querySelector("#discussions"));  
}
if (discussion) {
    ReactDOM.render(<Discussion />, document.querySelector("#discussion"));  
}
if (create) {
    ReactDOM.render(<Create />, document.querySelector("#create"));  
}