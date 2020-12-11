import React, { Component } from 'react';
import DiscussionsSidebar from './DiscussionsSidebar';
import FilterDiscussions from './FilterDiscussions';
import DiscussionsList from './DiscussionsList';

class Discussions extends Component {

    constructor() {
        super();
        this.state = {
            isFiltered: false,
            filterResult: "",
            isPrivate: false,
            isPublic: false,
            activeCategory: "",
            categories: [
                {
                    category: 'Business',
                    key: 1,
                },
                {
                    category: 'Entertainment',
                    key: 2,
                },
                {
                    category: 'General',
                    key: 3,
                },
                {
                    category: 'Health',
                    key: 4,
                },
                {
                    category: 'Science',
                    key: 5,
                },
                {
                    category: 'Sports',
                    key: 6,
                },
                {
                    category: 'Technology',
                    key: 7,
                },

            ],
            discussions: []
        }
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



    // FETCH THE ACTIVE CATEGORY 
    handlegetDiscussions(e) {
        this.setState({ activeCategory: e })
        let categoryToFetch = new FormData();
        categoryToFetch.append('category', e.toLowerCase())
        fetch('/getdiscussionsbycategory', {
            method: "POST",
            body: categoryToFetch,
            headers: {
                "X-CSRFToken": this.getCookie("csrftoken"),
            }
        })
            .then(response => response.json())
            .then(responseData =>
                this.setState({ discussions: responseData }))
            .catch(error => error)
    }

    // sets filtering state to true when user begins typing in search box and assigns value to filterResult which is passed to filter function before mapping the data to pass to the list.
    handleFilter(e) {
        if (e !== "") {
            this.setState({
                isFiltered: true,
                filterResult: e
            })
        } else {
            this.setState({
                isFiltered: false
            })
        }
    }

    // this swithces the public toggle state to true and false when filtering discussions
    handlePrivate(e) {
        if (e) {
            const pub = document.querySelector("#isPublicCheckbox")
            if (pub.checked === true) {
                pub.checked = false
                this.setState({ isPublic: false })
            }
            this.setState({ isPrivate: true })
        } else {
            this.setState({ isPrivate: false })
        }
    }

    // this swithces the private toggle state to true and false when filtering discussions
    handlePublic(e) {
        console.log(e)
        if (e) {
            const priv = document.querySelector("#isPrivateCheckbox")
            if (priv.checked === true) {
                priv.checked = false
                this.setState({ isPrivate: false })
            }
            this.setState({ isPublic: true })
        } else {
            this.setState({ isPublic: false })
        }
    }

    // when user clicks to join request the state with discussuons list is updated to change the requested to true.
    handleJoinRequest(key, object_id) {
        this.setState({
            discussions: this.state.discussions.map((discussion, index) => {
                if (index + 1 === key) {
                    return {
                        ...discussion,
                        requested: true
                    }
                }
                return discussion
            })
        })
        let discussionId = new FormData()
        discussionId.append('object_id', object_id)
        fetch('/privatediscussionrequest', {
            method: "POST",
            body: discussionId,
            headers: {
                "X-CSRFToken": this.getCookie("csrftoken"),
            }
        })
            .then(response => response.json())
            .then(responseData => console.log(responseData))
            .catch(error => error)
    }

    render() {
        return (
            <>
                <div class="row mt-5 mb-5 d-flex justify-content-center">
                    <h1>Join The Discussion</h1>
                </div>
                <div className="row">
                    <DiscussionsSidebar
                        categories={this.state.categories}
                        getDiscussions={e => this.handlegetDiscussions(e)}
                        activeCategory={this.state.activeCategory}
                    />
                    <div className="col-md-8">
                        <FilterDiscussions
                            handleFilter={e => this.handleFilter(e.target.value)}
                            handlePrivate={e => this.handlePrivate(e.target.checked, e.target.value)}
                            handlePublic={e => this.handlePublic(e.target.checked, e.target.value)}
                        />
                        <DiscussionsList
                            isPublic={this.state.isPublic}
                            isPrivate={this.state.isPrivate}
                            isFiltered={this.state.isFiltered}
                            filterResult={this.state.filterResult}
                            discussions={this.state.discussions}
                            request={(key, object_id) => this.handleJoinRequest(key, object_id)}
                        />
                    </div>

                </div>
            </>
        )
    }
}

export default Discussions;