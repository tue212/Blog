import { useEffect, useState, useContext } from "react";
import Post from "../Post";
import { UserContext } from "../UserContext";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const {apiUrl} = useContext(UserContext);
    useEffect (() => {
        fetch (`${apiUrl}/post`)
        .then(response => {
            response.json()
            .then(posts => {
                setPosts(posts)
            })
        })
    }, [])
    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post key={post._id} {...post}/>
            ))}
        </>
    )
}