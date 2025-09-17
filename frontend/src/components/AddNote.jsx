import React, { useContext, useState } from 'react'
import NoteContext from '../contextApi/NoteContextApi/NoteContext'
import { useNavigate } from 'react-router-dom';

export default function AddNote(props) {
    let navigate = useNavigate();
    const context = useContext(NoteContext);
    const { addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag: ""});
    
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        props.showAlert("Note added Successfully","success");
        navigate("/");
    }

    const handleChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    
    return (
        <div className='container my-3'>
            <h2>What’s on your mind? Add a new note...</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={handleChange}/>
                </div>
                
                <button disabled={note.title.length<3 || note.description.length<6} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}
