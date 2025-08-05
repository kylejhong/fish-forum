import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { supabase } from "./client";
import { FaTrash, FaEdit, FaHeart } from 'react-icons/fa';


const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [diffHours, setDiffHours] = useState(null);
    const [diffDays, setDiffDays] = useState(null);
    const [imageValid, setImageValid] = useState(false);
    const [comment, setComment] = useState('');

    const fetchPost = async () => {
        console.log(id);

        const { data, error } = await supabase
            .from("Forum")
            .select()
            .eq('id', id)
            .single();
            
        setPost(data);
    };

    const deletePost = async (event) => {
        event.preventDefault();
        await supabase
            .from("Forum")
            .delete()
            .eq('id', id);

        window.location = "/";
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (comment == null || comment.length == 0) {
            return;
        }

        const spread = post.comments ? (post.comments) : ([]);

        await supabase
            .from("Forum")
            .update({
                comments: [...spread, comment]
            })
            .eq('id', id);

        setComment('');

        fetchPost().catch(console.error)
    }

    const addLike = async (event) => {
        event.preventDefault();

        await supabase
            .from("Forum")
            .update ({
                likes: (post.likes + 1)
            })
            .eq('id', id);

        fetchPost().catch(console.error)
    }

    useEffect(() => {
        fetchPost().catch(console.error)
    }, [id]);

    useEffect(() => {
        if (post) {
            const timestamp = new Date(post.created_at);
            const now = new Date();

            const diffMs = now - timestamp;
            setDiffHours(Math.round(diffMs / (1000 * 60 * 60)));
            setDiffDays(Math.round(diffHours / (24)));
            
            const validateImage = async () => {
                const valid = await imageExists(post.image);
                setImageValid(valid);
            };

            validateImage().catch(console.error);
        }
    }, [post, diffHours]);

    const imageExists = async (url) => {
        try {
            const img = new Image();
            img.src = url;
            await img.decode(); // Throws if the image can't load or decode
            return true;
        } catch {
            return false;
        }
    };
    
    return (
        <div className="postContainer">
            {post ? (
                <>
                    <div className="postCard">
                        
                        <div className="postContent">
                            <div>
                                <p>Created {diffDays > 0 ? (`${diffDays} day${diffDays == 1 ? ("") : ("s")} ago`) : (`${diffHours} hour${diffHours == 1 ? ("") : ("s")} ago`)}</p>
                                <h1>{post.title}</h1>
                                <p>{post.content}</p>
                            </div>
                            {imageValid ? (
                                <img src={post.image}/>
                            ) : (
                                null
                            )}
                        </div>
                        <div className="likeBar">
                            <button onClick={addLike}>
                                <FaHeart style={{ marginRight: '8px', marginBottom: '-2px' }} />
                                {post.likes} Likes
                            </button>
                            <Link to={"/edit/" + id}>
                                <FaEdit style={{ marginRight: '8px', marginBottom: '-2px' }} />
                                Edit
                            </Link>
                            <Link onClick={deletePost}>
                                <FaTrash style={{ marginRight: '8px', marginBottom: '-2px' }} />
                                Delete
                            </Link>
                        </div>
                        
                        <div className="comments">
                            {post.comments && post.comments.length > 0 ? (
                                post.comments.map((comment, index) => (
                                    <p key={index}>{comment}</p>
                                ))
                            ) : (
                                <p>No comments yet!</p>
                            )}
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    id="comment"
                                    name="comment"
                                    placeholder="Write comment here..."
                                    value={comment}
                                    onChange={(value)=>{setComment(value.target.value)}}
                                />
                            </form>
                            
                        </div>
                        
                    </div>
                </>
            ) : (null)}
        </div>
    )
}

export default PostPage;