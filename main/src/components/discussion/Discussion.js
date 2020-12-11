import React, { Component } from 'react';
import DiscussionHeader from './DiscussionHeader';
import DiscussionBody from './DiscussionBody';
import CommentBox from './CommentBox';

class Discussion extends Component {
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            user: context.user,
            owner: context.owner,
            requests: [],
            members: [],
            comments: [],
            discussion_id: context.discussion_id,
            membercount: parseInt(context.membercount),
            private: context.private
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
    // when component mounts check if user is the owner of the article and handle functions as necessary
    componentDidMount() {
        this._isMounted = true;
        this.handleLoadComments()
        if (this.state.private === "True" && this.state.user === this.state.owner) {
            console.log('user owner')
            this.handleUpdateRequests()
            this.handleLoadMembers()
            this.interval = setInterval(() => this.handleUpdateRequests(), 10000)
        }
        this.interval = setInterval(() =>
            this.handleLoadComments(), 10000)
    }
    // used to clear interval after navigating from page
    componentWillUnmount() {
        this._isMounted = false;
        // Clear the interval right before component unmount
        clearInterval(this.interval);
    }
    // loads requests to join the article
    handleUpdateRequests() {
        let discussion_id = new FormData()
        discussion_id.append('discussion_id', this.state.discussion_id)
        fetch('/getdiscussionrequests', {
            method: "POST",
            body: discussion_id,
            headers: {
                "X-CSRFToken": this.getCookie("csrftoken"),
            }

        })
            .then(response => response.json())
            .then(responseData => {
                if (this._isMounted) {
                    this.setState({ requests: responseData })
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    console.error('Error', error)
                }
            });
    }

    // loads list of memebers
    handleLoadMembers() {
        let discussion_id = new FormData()
        discussion_id.append('discussion_id', this.state.discussion_id)
        fetch('/loadmembers', {
            method: "POST",
            body: discussion_id,
            headers: {
                "X-CSRFToken": this.getCookie("csrftoken"),
            }

        })
            .then(response => response.json())
            .then(responseData => {
                if (this._isMounted) {
                    this.setState({ members: responseData })
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    console.error('Error', error)
                }
            });
    }

    // loads comments for the article
    handleLoadComments() {
        let discussion_id = new FormData()
        discussion_id.append('discussion_id', this.state.discussion_id)
        fetch('/getcomments', {
            method: "POST",
            body: discussion_id,
            headers: {
                "X-CSRFToken": this.getCookie("csrftoken"),
            }
        })
            .then(response => response.json())
            .then(responseData => {
                if (this._isMounted) {
                    this.setState({ comments: responseData })
                }
            }).catch(error => {
                if (this._isMounted) {
                    console.error('Error', error)
                }
            });
    }

    // handles posting a new comment
    handleComment(text, id, type) {
        let comment = new FormData();
        comment.append('text', text)
        comment.append('id', id)
        comment.append('type', type)
        fetch('/addcomment', {
            method: "POST",
            body: comment,
            headers: {
                "X-CSRFToken": this.getCookie("csrftoken"),
            }
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData)
                this.handleLoadComments()
            })
            .catch(error => console.error(error))
    }

    // handles deleteing a comment
    handleDeleteComment(id, type) {
        var confirm = prompt('Type DELETE to delete discussion')
        if (confirm === 'DELETE') {
            this.deleteComment(id, type)
        } else if (confirm === null) {

        } else {
            alert('Please try again')
        }
    }

    // sends request to server to delete from database
    deleteComment(id, type) {
        let data = new FormData()
        data.append('id', id)
        data.append('type', type)
        fetch('/deletecomment', {
            method: "POST",
            body: data,
            headers: {
                "X-CSRFToken": this.getCookie("csrftoken"),
            }
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData)
                this.handleLoadComments()
            })
            .catch(error => console.error(error))
    }

    // delete member from discussion
    deleteMember(id) {
        let memberid = new FormData()
        memberid.append('id', id)
        fetch('/deletemember', {
            method: "POST",
            body: memberid,
            headers: {
                "X-CSRFToken": this.getCookie("csrftoken"),
            }
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData)
                this.setState({ membercount: this.state.membercount - 1 })
                this.handleLoadMembers()
            })
            .catch(error => console.error(error))

    }

    // handle discussion owner decision
    handleDecision(discussion_id, object_id, user, decision) {
        this._isMounted = true;
        if (this._isMounted) {
            console.log(discussion_id, object_id, user, decision)
            let decisionData = new FormData();
            if (decision === "false") {
                decisionData.append('decision', decision)
                decisionData.append('object_id', object_id)
            } else {
                this.setState({ membercount: this.state.membercount += 1 })
                decisionData.append('discussion_id', discussion_id)
                decisionData.append('object_id', object_id)
                decisionData.append('user', user)
                decisionData.append('decision', decision)
            }
            fetch('/handledecision', {
                method: 'POST',
                body: decisionData,
                headers: {
                    "X-CSRFToken": this.getCookie("csrftoken"),
                }
            })
                .then(response => response.json())
                .then(responseData => {
                    if (this._isMounted && responseData['message'] === 'ok')
                        this.handleUpdateRequests()
                    this.handleLoadMembers()
                })
                .catch(error => console.error(error))
        }

    }


    render() {
        return (
            <>
                <h2 className={'text-' + context.category + ' diplay-4 mt-5 text-center'}>In {context.category}</h2>
                <DiscussionHeader
                    title={context.title}
                    author={context.author}
                    url={context.url}
                    urltoimage={context.urltoimage}
                    owner={context.owner}
                    membercount={this.state.membercount}
                    private={context.private}
                    user={context.user}
                />
                <DiscussionBody
                    private={context.private}
                    user={this.state.user}
                    owner={context.owner}
                    discussion_id={context.discussion_id}
                    requests={this.state.requests}
                    members={this.state.members}
                    handleDecision={(discussion_id, object_id, name, decision) => this.handleDecision(discussion_id, object_id, name, decision)}
                    comments={this.state.comments}
                    handleReply={(text, comment_id) => this.handleComment(text, comment_id, 'reply')}
                    deleteComment={(id, type) => this.handleDeleteComment(id, type)}
                    deleteMember={(id) => this.deleteMember(id)}
                />
                <CommentBox
                    handleSubmit={(text) => this.handleComment(text, context.discussion_id, 'comment')}
                />
            </>
        )
    }
}

export default Discussion;