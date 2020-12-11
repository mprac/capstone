import React from 'react';
import UpdateProfile from './UpdateProfile';

const ProfileHead = props => {
    
    if (props.isEditing) {
        return (
            <>
            <div className="row justify-content-center custom">
            <div className="col-12 text-center mt-5 mb-5">
            
                    <UpdateProfile
                        fname={props.fname}
                        lname={props.lname}
                        updateProfile={(fname,lname) => props.updateProfile(fname,lname)}
                    />
                    <button type="button" className="btn btn-outline-primary btn-md" onClick={props.toggleEditProfile}>{props.isEditing ? "Done" : "Edit"}</button>
               </div>
            </div>
        </>
        )
    }

    return (
        <>
            <div className="row justify-content-center custom">
                <div className="col-12 text-center mt-5 mb-5">
                    <h2>{props.fname} {props.lname}</h2>
                    <button type="button" className=" btn btn-outline-primary btn-md"  onClick={props.toggleEditProfile}>{props.isEditing ? "Save" : "Edit"}</button>
                </div>
            </div>
        </>
    )
}

export default ProfileHead;