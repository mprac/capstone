import React, { Component } from 'react';
import DiscussionButton from './DiscussionButton';

class StartDiscussion extends Component {
    constructor() {
        super();
        this.state = {
          id: '',
        };
      }
    //Cookie to get csrftoken for fetch
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

    handleGoToDiscussion(id) {
        const url = '/discussion/' + id;
        document.location.href = url;
    }

    handleStartPrivateDiscussion = () => {
        
        let articleData = new FormData();
        articleData.append('url', this.props.url)
        articleData.append('bool', 'True')
        articleData.append('category', this.props.category)
        fetch('/startdiscussion', {
            method: 'POST',
            body: articleData,
            headers: {
                "X-CSRFToken": this.getCookie("csrftoken"),
            }
        })
        .then(response => response.json())
        .then(responseData => {
            alert(responseData[0]['message'])
            if (responseData[1]['id'] > 1) {
                this.handleGoToDiscussion(responseData[1]['id']) 
            }
            
        })
        .catch(error => console.log('Error', error))

        
    }
    
    handleStartPublicDiscussion = () => {
       
        let articleData = new FormData();
        articleData.append('url', this.props.url)
        articleData.append('bool', 'False')
        articleData.append('category', this.props.category)
        fetch('/startdiscussion', {
            method: 'POST',
            body: articleData,
            headers: {
                "X-CSRFToken": this.getCookie("csrftoken"),
            }
        })
        .then(response => response.json())
        .then(responseData => {
            alert(responseData[0]['message'])
            if (responseData[1]['id'] > 1) {
                this.handleGoToDiscussion(responseData[1]['id']) 
            }
            
        })
        .catch(error => console.log('Error', error))
    }
    render() {
        return (
            <DiscussionButton 
            startPrivateDiscussion={() => this.handleStartPrivateDiscussion()}
            startPublicDiscussion={() => this.handleStartPublicDiscussion()}
            
            /> 
        );
    }
}

export default StartDiscussion;