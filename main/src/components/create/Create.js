import React, { Component } from 'react';
import SetupArticle from './SetupArticle';

class Create extends Component {
    constructor() {
        super();
        this.state = {
            url: '',
            article: [],
            scraped: false
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
    // check if string is not empty
    handleScrape() {
        if (this.state.url.trim() != "") {
            this.scrapeArticle()
        }

    }

    // sends article to server to scrape using python 
    scrapeArticle() {
        let url = new FormData();
        url.append('url', this.state.url)
        fetch('/scrape', {
            method: "POST",
            body: url,
            headers: {
                "X-CSRFToken": this.getCookie("csrftoken"),
            }
        }).then(response => response.json())
            .then(responseData => {
                this.setState({ article: responseData[0], scraped: true })
                console.log(responseData)
            })
            .catch(error => console.error(error))
    }

    // saves scraped data to database
    saveArticle(title, description, category) {
        let scrapedArticle = new FormData();
        scrapedArticle.append('title', title)
        scrapedArticle.append('description', description)
        scrapedArticle.append('category', category)
        scrapedArticle.append('url', this.state.article.url)
        scrapedArticle.append('author', this.state.article.author)
        scrapedArticle.append('name', this.state.article.name)
        scrapedArticle.append('urltoimage', this.state.article.urltoimage)
        fetch('/savescrapedarticle', {
            method: "POST",
            body: scrapedArticle,
            headers: {
                "X-CSRFToken": this.getCookie("csrftoken"),
            }
        })
            .then(response => response.json())
            .then(responseData => alert(responseData['message']))
            .catch(error => console.error(error))

    }

    render() {
        if (this.state.scraped) {
            return (
                <>
                    <div className="row scrape">
                        <div className="col-12 text-center mt-5">
                            <h1>Scrape Article</h1>
                            <input className="shadow form-control form-control-lg rounded mt-5" type="text" placeholder="Paste article url to save to profile" onChange={(e) => this.setState({ url: e.target.value })} /><br />
                            <button className="btn btn-outline-primary mt-5" onClick={() => this.handleScrape(this.state.url)}>Scrape</button>
                        </div>

                    </div>
                    <div className="row scrape-setup">
                        <SetupArticle
                            author={this.state.article.author}
                            description={this.state.article.description}
                            name={this.state.article.name}
                            title={this.state.article.title}
                            url={this.state.article.url}
                            urltoimage={this.state.article.urltoimage}
                            saveArticle={(title, description, category) => this.saveArticle(title, description, category)}
                        />
                    </div>

                </>

            )
        }
        return (
            <>
                <div className="row scrape">
                    <div className="col-12 text-center mt-5">
                        <h1>Scrape Article</h1>
                        <input className="shadow form-control form-control-lg rounded mt-5" type="text" placeholder="Paste article url to save to profile" onChange={(e) => this.setState({ url: e.target.value })} /><br />
                        <button className="btn btn-outline-primary mt-5" onClick={() => this.handleScrape(this.state.url)}>Scrape</button>
                    </div>

                </div>

            </>

        )
    }
}

export default Create;