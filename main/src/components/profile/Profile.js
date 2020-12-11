import React, { Component } from 'react';
import ProfileHead from './ProfileHead';
import CardList from './CardList';
import ProfileCardHolder from './ProfileCardHolder';

class Profile extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      YourDiscussions: [],
      SavedArticles: [],
      JoinedPrivateDiscussions: [],
      pendingRequests: [],
      isEditing: false,
      fname: context.fname,
      lname: context.lname
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

  // when component mounts load the profiles data
  componentDidMount() {
    this._isMounted = true;
    this.loadProfileData()
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  // loads all profile data such as saved articles, discussions and requests
  loadProfileData() {
    fetch(`/getprofiledata/`, {
      method: "POST",
      headers: {
        "X-CSRFToken": this.getCookie("csrftoken"),
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (this._isMounted) {
          // yourSavedArticles
          this.setState({ SavedArticles: responseData['yourSavedArticles'] });
          if (Object.keys(responseData['yourSavedArticles']).length) {
            this.setState({ SavedArticles: responseData['yourSavedArticles'] });
          } else {
            this.setState({ SavedArticles: [{ 'title': 'Empty', 'id': 1 }] });
          }
          // YourDiscussions
          if (Object.keys(responseData['YourDiscussions']).length) {
            this.setState({ YourDiscussions: responseData['YourDiscussions'] });
          } else {
            this.setState({ YourDiscussions: [{ 'title': 'Empty', 'id': 1 }] });
          }
          // JoinedPrivateDiscussions
          if (Object.keys(responseData['JoinedPrivateDiscussions']).length) {
            this.setState({ JoinedPrivateDiscussions: responseData['JoinedPrivateDiscussions'] });
          } else {
            this.setState({ JoinedPrivateDiscussions: [{ 'title': 'Empty', 'id': 1 }] });
          }
          // pendingRequests
          if (Object.keys(responseData['pendingRequests']).length) {
            this.setState({ pendingRequests: responseData['pendingRequests'] });
          } else {
            this.setState({ pendingRequests: [{ 'title': 'Empty', 'id': 1 }] });
          }
        }
      })
      .catch(error => {
        if (this._isMounted) {
          console.error(error)
        }
      });
  }

  // toggle edit profile
  toggleEditProfile() {
    this.setState({ isEditing: !this.state.isEditing })
  }

  // confirm delete item from profile and check what user is deleting to call the correct function to handle the deletion
  confirmDelete(id, type) {
    var confirm = prompt('Type DELETE to delete')
    if (confirm === 'DELETE') {
      if (type === "article") {
        this.handleDeleteArticle(id)
      } else if (type === "discussion") {
        this.handleDeleteDiscussion(id)
      } else if (type === "requests") {
        this.cancelRequest(id)
      } else if (type === "leave") {
        this.leaveDiscussion(id)
      }
    } else if (confirm === null) {

    } else {
      alert('Please try again')
    }
  }
  // delete discussion by sending request to server
  handleDeleteDiscussion(id) {
    let discussionData = new FormData();
    discussionData.append('object_id', id)
    fetch('/deletediscussion', {
      method: "POST",
      body: discussionData,
      headers: {
        "X-CSRFToken": this.getCookie("csrftoken"),
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData['message'] === 'ok')
          this.loadProfileData()
      })
      .catch(error => console.log('Error', error))
  }
  // delete article by sending request to server
  handleDeleteArticle(id) {
    let articleData = new FormData();
    articleData.append('object_id', id)
    fetch('/deletearticle', {
      method: 'POST',
      body: articleData,
      headers: {
        "X-CSRFToken": this.getCookie("csrftoken"),
      }
    })
      .then(response => response.json())
      .then(responseDate => {
        if (responseDate['message'] === 'ok')
          this.loadProfileData();
      })
      .catch(error => console.error('Error', error))
  }
  // cancel a request to join a private discussion
  cancelRequest(id) {
    let requestId = new FormData();
    requestId.append('id', id)
    fetch('/cancelrequest', {
      method: "POST",
      body: requestId,
      headers: {
        "X-CSRFToken": this.getCookie("csrftoken"),
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData['message'] === 'ok')
          this.loadProfileData();
      })
      .catch(error => console.log('Error', error))
  }
  // Delete membership in discussion by sending request to server
  leaveDiscussion(id) {
    let discussionId = new FormData();
    discussionId.append('id', id)
    fetch('/leavediscussion', {
      method: "POST",
      body: discussionId,
      headers: {
        "X-CSRFToken": this.getCookie("csrftoken"),
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData['message'] === 'ok')
          this.loadProfileData();
      })
      .catch(error => console.log('Error', error))
  }

  // Update profile name
  handleUpdateProfile(fname, lname) {
    let profileUpdates = new FormData()
    if (context.fname !== fname) {
      const firstname = fname
      profileUpdates.append('fname', firstname)
      this.setState({ fname: firstname })
    } else {
      profileUpdates.append('fname', "")
    }
    if (context.lname !== lname) {
      const lastname = lname
      profileUpdates.append('lname', lastname)
      this.setState({ lname: lastname })
    } else {
      profileUpdates.append('lname', "")
    }
    fetch('/updateprofile', {
      method: "POST",
      body: profileUpdates,
      headers: {
        "X-CSRFToken": this.getCookie("csrftoken"),
      }
    })
      .then(response => response.json())
      .then(responseData => console.log(responseData['message']))
      .catch(error => console.log('Error', error))
  }


  render() {
    return (
      <>
        <ProfileHead
          fname={this.state.fname}
          lname={this.state.lname}
          toggleEditProfile={() => this.toggleEditProfile()}
          updateProfile={(fname, lname) => this.handleUpdateProfile(fname, lname)}
          isEditing={this.state.isEditing}
        />
        <div className="row mt-5">
          <ProfileCardHolder
            section="Your Discussions"
          >
            <div className="overflow-auto">
              <CardList
                items={this.state.YourDiscussions}
                type="discussions"
                handleDelete={(id) => this.confirmDelete(id, "discussion")}
              />
            </div>
          </ProfileCardHolder>
          <ProfileCardHolder
            section="Your Saved Articles"
          >
            <div className="overflow-auto">
              <CardList
                items={this.state.SavedArticles}
                type="saved"
                handleDelete={(id) => this.confirmDelete(id, "article")}
              />
            </div>
          </ProfileCardHolder>
          <ProfileCardHolder
            section="Joined Private Discussions"
          >
            <div className="overflow-auto">
              <CardList
                items={this.state.JoinedPrivateDiscussions}
                type="joined"
                handleDelete={(id) => this.confirmDelete(id, "leave")}
              />
            </div>
          </ProfileCardHolder>
          <ProfileCardHolder
            section="Pending Requests"
          >
            <div className="overflow-auto">
              <CardList
                items={this.state.pendingRequests}
                type="requests"
                handleDelete={(id) => this.confirmDelete(id, "requests")}
              />
            </div>
          </ProfileCardHolder>
        </div>
      </>
    )
  }

}


export default Profile;