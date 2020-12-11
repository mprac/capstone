import React from 'react';

const Jumbotron = props => {
    return (
        <div className="jumbotron p-4 p-md-5 text-white bg-dark container-fluid text-center">
            <div className="col-md-12 px-0">
                <h1 className="display-7 font-italic ">Save. Discuss. Privately.</h1>
                <p className="lead mb-0"><a href="/signup" className="text-white font-weight-bold">Sign up</a> or <a href="/login" className="text-white font-weight-bold">Login</a> </p>
            </div>
        </div>
    )
}

export default Jumbotron;