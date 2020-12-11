import React, { Component } from 'react';

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: this.props.fname,
            lname: this.props.lname,
        };
    }
    render() {
        return (
            <>
            
             <h2><input type="text"
                        value={this.state.fname}
                        onChange={e => this.setState({ fname: e.target.value })}
                    /></h2>
                   <h2>
                        <input type="text"
                            value={this.state.lname}
                            onChange={e => this.setState({ lname: e.target.value })}
                        /></h2>

                <button type="button" className="btn btn-outline-primary btn-md" onClick={() => this.props.updateProfile(this.state.fname, this.state.lname)}>Save</button>
            </>
        )
    }
}

export default UpdateProfile;