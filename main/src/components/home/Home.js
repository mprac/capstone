import React, { Component } from 'react';
import ArticleList from './ArticleList';
import Jumbotron from './Jumbotron';

class Home extends Component {
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            articles: []
        };
    }
    // Cookie to get csrftoken for fetch
    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }

        return cookieValue;
    };
    // gets article list to display on homepage
    componentDidMount() {
        this._isMounted = true;
        fetch('/getarticles', {
            method: "POST",
            headers: {
              "X-CSRFToken": this.getCookie("csrftoken"),
          }
        })
        .then(response => response.json())
        .then(responseData => {
          if (this._isMounted) {
            this.setState({ articles: responseData });
          }
        })
        .catch(error => {
          if (this._isMounted) {
            console.log('Error getting data', error)
          }
        });
    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    
    render() {
        return (
        <>
        <Jumbotron />
        <ArticleList
        articles={this.state.articles} />
        </>
        )
        
    }

}

export default Home;