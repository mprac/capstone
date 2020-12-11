import React, { Component } from 'react';
import JoinRequestList from './JoinRequestList';
import CommentList from './CommentList';
import MembersList from './MembersList';

class DiscussionBody extends Component {
    _isMounted = false
    constructor() {
        super();
        this.state = {
            limit: 3,
        }
    }

    // loads more comments
    handleLoadMore = () => {
        this.setState({
            limit: this.state.limit + 1
        });
    }

    // when component mounts check screen height to load more comments as user scrolls down
    componentDidMount() {
        this._isMounted = true
        window.onscroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                this.setState({
                    limit: this.state.limit + 1
                });
            }
        };
    }

    componentWillUnmount() {
        this._isMounted = false
    }


    render() {
        if (this.props.private === "True" && this.props.user === this.props.owner) {

            return (
                <>
                    <div className="row">
                        <div className="col-md-3 p-0">
                            <JoinRequestList
                                discussion_id={this.props.discussion_id}
                                requests={this.props.requests}
                                handleDecision={(discussion_id, object_id, name, decision) => this.props.handleDecision(discussion_id, object_id, name, decision)}
                            />
                            <MembersList
                                discussion_id={this.props.discussion_id}
                                members={this.props.members}
                                deleteMember={(id) => this.props.deleteMember(id)}
                            />
                        </div>
                        <div className="col-md-9">
                            <CommentList
                                user={this.props.user}
                                comments={this.props.comments}
                                handleReply={(e, comment_id) => this.props.handleReply(e, comment_id)}
                                limit={this.state.limit}
                                loadmore={this.handleLoadMore}
                                deleteComment={(id, type) => this.props.deleteComment(id, type)}
                            />
                        </div>
                    </div>
                </>
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col-md-12 p-0">
                        <CommentList
                            user={this.props.user}
                            comments={this.props.comments}
                            handleReply={(e, index) => this.props.handleReply(e, index)}
                            limit={this.state.limit}
                            loadmore={this.handleLoadMore}
                            deleteComment={(id, type) => this.props.deleteComment(id, type)}
                        />
                    </div>
                </div>
            </>
        )
    }

}

export default DiscussionBody;
