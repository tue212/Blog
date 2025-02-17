import { useState, useContext } from "react";
import { UserContext } from "../UserContext";


export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {apiUrl} = useContext(UserContext);

    async function register(ev) {
        ev.preventDefault();
        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json; charset=UTF-8'},        
        });
        if (response.status === 200) {
            alert('registration successful');
        } else {
            alert('registration fail');
        }
    }

    return (
        <form action="" className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" 
                   placeholder="username"
                   value={username}
                   onChange={ev => setUsername(ev.target.value)} />
            <input type="password"
                   placeholder="password"
                   value={password}
                   onChange={ev => setPassword(ev.target.value)} />
            <button>Register</button>
        </form>
    );
}