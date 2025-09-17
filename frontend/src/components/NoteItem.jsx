import React,{useContext} from 'react'
import NoteContext from '../contextApi/NoteContextApi/NoteContext'

export default function NoteItem(props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                    <i className="fa-solid fa-trash" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully","danger")}}></i>
                    <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text"><small className="text-muted">{note.tag}</small></p>
                </div>
            </div>
        </div>
    )
}
