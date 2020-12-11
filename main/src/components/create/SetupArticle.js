import React, { useState } from 'react'

const SetupArticle = (props) => {

    const [title, setTitle] = useState(props.title)
    const [description, setDescription] = useState(props.description)
    const [category, setCategory] = useState("general")

    return (
        <>
            <div className="col-12 text-center mt-5">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Article Image</label>
                    <div className="col-sm-5">
                        <img className="img-fluid img-thumbnail w-100" src={props.urltoimage} />
                    </div>

                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control form-control-lg" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control form-control-lg" height="300px" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Category</label>
                    <div className="col-sm-10">
                        <select className="custom-select custom-select-lg mb-3" onChange={(e) => setCategory(e.target.value)}>
                            <option value="general" defaultValue>General</option>
                            <option value="business">Business</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="health">Health</option>
                            <option value="science">Science</option>
                            <option value="sports">Sports</option>
                            <option value="technology">Technology</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10 offset-sm-2">
                        <button className="btn btn-outline-primary btn-lg btn-block" onClick={() => props.saveArticle(title, description, category)}>Save Article</button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default SetupArticle