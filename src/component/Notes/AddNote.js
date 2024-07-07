//parent 

import React, { useContext, useState } from 'react';
import noteContext from '../.././Context/Note/NoteContext';

const AddNote = () => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag);
    }

    return (
        <div className='container my-3 ' >
            <h2>Your Notes</h2>
            <form className='my-3'>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        aria-describedby="emailHelp"
                        onChange={onChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name='description'
                        onChange={onChange} />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="button" className="btn btn-primary" onClick={handleSubmit}>Add note</button>

            </form>
        </div>

    );
}

export default AddNote;
