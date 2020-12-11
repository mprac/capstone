import React from 'react';

const ProfileCardHolder = (props) => {
    return (
    <div className="col-md-6 mb-5">
        <div className="d-flex justify-content-between">
        <h3 className="card-title">{props.section}</h3>
        {props.type === "monitor" ? <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="isPrivateCheckbox" onClick={props.handleMonitor} />
                    <label className="custom-control-label" htmlFor="isPrivateCheckbox">Toggle to monitor</label>
                </div> : ''}
        </div>
        <ul className="list-group">
        {props.children}
        </ul>
    </div>
    );
}

export default ProfileCardHolder;