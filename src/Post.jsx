import { Link } from "react-router-dom";

const Post = ({id, created_at, title, content, image, comments, likes}) => {
    const timestamp = new Date(created_at);
    const now = new Date();

    const diffMs = now - timestamp;
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffHours / (24));

    return (

        <Link
            style={{ color: "rgba(255, 255, 255, 1)" }}
            to={`/post/${id}`}
        >
            <div className="post">
                <p>Created {diffDays > 0 ? (`${diffDays} day${diffDays == 1 ? ("") : ("s")} ago`) : (`${diffHours} hour${diffHours == 1 ? ("") : ("s")} ago`)}</p>
                <h2 className="title">{title}</h2>
                <p>{likes} likes</p>
            </div>
        </Link>
    )
}

export default Post;