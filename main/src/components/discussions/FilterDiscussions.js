import React from 'react';

const FilterDiscussions = (props) =>
    <>
        <div className="row mb-5">
            <div className="col-md-6">
                <div className="input-group justify-content-bottom">
                    <input type="text" className="form-control" placeholder="Search Discussions" onChange={props.handleFilter} />
                    <div className="input-group-prepend">
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="isPrivateCheckbox" onClick={props.handlePrivate} />
                    <label className="custom-control-label" htmlFor="isPrivateCheckbox">Toggle for private</label>
                </div>
                <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="isPublicCheckbox" onClick={props.handlePublic} />
                    <label className="custom-control-label" htmlFor="isPublicCheckbox">Toggle for public</label>
                </div>
            </div>
        </div>
    </>

export default FilterDiscussions;