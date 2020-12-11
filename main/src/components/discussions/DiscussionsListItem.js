import React, { Component } from 'react';
import JoinDiscussionButton from './JoinDiscussionButton';
import GoToDiscussionbutton from '../buttons/GoToDiscussionButton';

class DiscussionsListItem extends Component {

    // sends user to discussion page
    handleGoToDiscussion() {
        const url = '/discussion/' + this.props.object_id;
        document.location.href = url;
    }
 
    render() {
        if (this.props.private) {
            return (
                <>
                    <div className="col mb-5">
                        <div className="card shadow">
                            <img src={this.props.urltoimage} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title"><small><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-shield-lock text-success" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.443 1.991a60.17 60.17 0 0 0-2.725.802.454.454 0 0 0-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 0 0 8 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 0 0 2.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 0 0-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 0 1 2.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 0 1-2.418 2.3 6.942 6.942 0 0 1-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 0 1-1.007-.586 11.192 11.192 0 0 1-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 0 1 2.415 1.84a61.11 61.11 0 0 1 2.772-.815z" />
                                    <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
                                </svg> by {this.props.owner}</small></h5>
                                <p className="card-text">{this.props.title}</p>

                                <div className="btn-group" role="group">
                                    <JoinDiscussionButton
                                        requested={this.props.requested}
                                        request={() => this.props.request(this.props.id, this.props.object_id)}
                                    />
                                </div><br />
                                <small className="text-secondary"> {this.props.membercount} members</small> <small className="text-secondary"> {this.props.commentcount} comments</small>

                            </div>

                        </div>
                    </div>
                </>
            )
        }
        return (
            <>

                <div className="col mb-5">
                    <div className="card shadow">
                        <img src={this.props.urltoimage} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title"><small><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-shield-lock text-success" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.443 1.991a60.17 60.17 0 0 0-2.725.802.454.454 0 0 0-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 0 0 8 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 0 0 2.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 0 0-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 0 1 2.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 0 1-2.418 2.3 6.942 6.942 0 0 1-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 0 1-1.007-.586 11.192 11.192 0 0 1-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 0 1 2.415 1.84a61.11 61.11 0 0 1 2.772-.815z" />
                                <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
                            </svg> by {this.props.owner}</small></h5>
                            <p className="card-text">{this.props.title}</p>
                            <div className="btn-group" role="group">
                                <GoToDiscussionbutton
                                    GoToDiscussion={() => this.handleGoToDiscussion()}
                                />
                            </div>
                            <br />
                            <small className="text-secondary"> {this.props.commentcount} comments</small>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default DiscussionsListItem