import { useContext, useEffect } from "react";
import {Link} from "react-router-dom";
import {UserContext} from '../src/UserContext'

export default function Header() {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const {apiUrl} = useContext(UserContext);
    useEffect(() => {
        fetch(`${apiUrl}/profile`, {
        credentials: 'include',
        })
          .then(response => {
            response.json()
            .then(userInfo => {
          setUserInfo(userInfo)
            })
          });
    }, [])

    function logout() {
      fetch(`${apiUrl}/logout`, {
        credentials: 'include',
        method: 'POST'
      });
      setUserInfo(null);
    }

    const username = userInfo?.username

    return (
        <header>
        <Link to="" className="logo">My Blog</Link>
        <nav>
          {username && (
            <>
              <Link to={"/create"}>Create New Post</Link>
              <span onClick={logout}>Logout</span>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    );
}