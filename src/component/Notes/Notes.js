import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../.././Context/Note/NoteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = ({ navigate }) => {
    const context = useContext(noteContext)

    const { notes, FetchNotes, updateNote } = context;
    //to create reffrence
    const refClose = useRef(null);
    const ref = useRef(null);
    navigate = useNavigate();
    const isInitialMount = useRef(true);
    const [note, setNote] = useState({ id: "", title1: "", description1: "", tag1: "default" });

    useEffect(() => {
        if (isInitialMount.current) {
            FetchNotes();
            isInitialMount.current = false;
        }
    }, [FetchNotes]);

    const updatenote = (currentNote) => {
        if (ref.current) {
            ref.current.click();
        }
        setNote({
            id: currentNote._id,
            etitle: currentNote.title1,
            edescription: currentNote.description1,
        });
    }

    const handleSubmit = () => {
        updateNote(note.id, note.title1, note.description1);
        refClose.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
        
            <AddNote />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>

                                <div className="mb-3">
                                    <label htmlFor="title1" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title1" name="title1" aria-describedby="emailHelp" onChange={onChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description1" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description1" name='description1' onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <h2>your notes</h2>
                {notes.map((note) => {
                    console.log("notes_>", note);
                    return <Noteitem key={note._id} updatenote={updatenote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes; 
