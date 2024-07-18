import { Link } from "react-router-dom";
import { UserContext, } from "./UserContext";
import { useContext } from "react";

export default function Post({title, summary, createdAt, cover, author, _id}) {
    const {apiUrl} = useContext(UserContext);
    return (
    <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={`${apiUrl}/`+cover} alt="" />
          </Link>
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="info">
            <span className="author">{author.username}</span>
            <time>{createdAt}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
    );
}