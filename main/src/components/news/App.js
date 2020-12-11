import React, { Component } from 'react';
import CardList from './CardList';
import SearchBar from './SearchBar';

class App extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      searchResult: "",
      isFiltered: false,
      news: [],
      category: ""
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
  // when component mounts get the window url and extract the category name to send to server to call newsAPI
  componentDidMount() {
    this._isMounted = true;
    var c = window.location.pathname;
    c = c.replace(/\/\bnews\/|\/+$/g, "");
    this.setState({ category: c })
    fetch(`/getnews/${c}/`, {
      method: "POST",
      headers: {
        "X-CSRFToken": this.getCookie("csrftoken"),
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (this._isMounted) {
          this.setState({ news: responseData });
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
  // handles the filter for instant search
  handleFilter(e) {
    if (e !== "") {
      this.setState({
        isFiltered: true,
        searchResult: e
      })
    } else {
      this.setState({
        isFiltered: false
      })
    }

  }

  render() {
    return (
      <>
        <div className="jumbotron jumbotron-fluid text-center">
          <div className="container">
            <h1 className={"display-4 " + "text-" + context.category.toLowerCase()}>In {context.category}</h1>
            <p className="lead">Search articles in {context.category} to start a discussion</p>
            <SearchBar
              category={this.state.category}
              handleFilter={e => this.handleFilter(e.target.value)}
            />
          </div>
        </div>

        <CardList
          isFiltered={this.state.isFiltered}
          searchResult={this.state.searchResult}
          news={this.state.news}
        />
      </>
    );
  }

}

export default App;