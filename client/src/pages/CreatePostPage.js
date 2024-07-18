import { useState, useContext } from "react"
import 'react-quill/dist/quill.snow.css'
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import { UserContext } from "../UserContext";

export default function CreatePostPage () {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [file, setFile] = useState('');
    const [content, setContent] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {apiUrl} = useContext(UserContext);

    async function createNewPost (ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', file[0])
        
        const response = await fetch(`${apiUrl}/post`, {
            method: 'POST',
            body: data,
            credentials: 'include',
        });

        if(response.ok){
            setRedirect(true);
            alert('Create Successfully')
        };
    }

    if(redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <form action="" className="login" onSubmit={createNewPost}>
            <h1>Create Post</h1>
            <input type="title" 
                   placeholder="title"
                   value={title}
                   onChange={ev => setTitle(ev.target.value)} />
            <input type="summary"
                   placeholder="summary"
                   value={summary}
                   onChange={ev => setSummary(ev.target.value)} />
            <input type="file"
                   onChange={ev => setFile(ev.target.files)}/>
            <Editor onChange={setContent} value={content}/>
            <button style={{marginTop: '5px'}}>Create</button>
        </form>
    )
}