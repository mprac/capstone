import React, { Component } from 'react';
import SaveButton from './SaveButton';

class SaveArticle extends Component {
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

handleSaveArticle = () => {
    let articleData = new FormData();
    articleData.append('id', this.props.id)
    articleData.append('author', this.props.author)
    articleData.append('description', this.props.description)
    articleData.append('name', this.props.name)
    articleData.append('publishedAt', this.props.publishedAt)
    articleData.append('title', this.props.title)
    articleData.append('url', this.props.url)
    articleData.append('urlToImage', this.props.urlToImage)
    articleData.append('category', this.props.category)
    fetch('/savearticle', {
        method: "POST",
        body: articleData,
        headers: {
            "X-CSRFToken": this.getCookie("csrftoken"),
        }
    })
    .then(response => response.json())
    .then(responseData => alert(responseData['message']))
    .catch(error => console.log('Error', error))
}

    render() {
        return (
            <SaveButton 
            saveOne={() => this.handleSaveArticle()}
            />
        );
    }
}

export default SaveArticle;