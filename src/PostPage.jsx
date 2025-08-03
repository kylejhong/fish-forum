import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "./client";

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [diffHours, setDiffHours] = useState(null);
    const [diffDays, setDiffDays] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            console.log(id);

            const { data, error } = await supabase
                .from("Forum")
                .select()
                .eq('id', id)
                .single();
                
            setPost(data);
        };

        fetchPost().catch(console.error)
    }, [id]);

    useEffect(() => {
        if (post) {
            const timestamp = new Date(post.created_at);
            const now = new Date();

            const diffMs = now - timestamp;
            setDiffHours(Math.round(diffMs / (1000 * 60 * 60)));
            setDiffDays(Math.round(diffHours / (24)));
        }
    }, [post, diffHours]);

    const imageExists = (url) => {
        var image = new Image();
        image.src = url;
        if (image.width == 0) {
            return false;
        } else {
            return true;
        }
    }
    
    return (
        <div>
            {post ? (
                <>
                    <p>Created {diffDays > 0 ? (`${diffDays} day${diffDays == 1 ? ("") : ("s")} ago`) : (`${diffHours} hour${diffHours == 1 ? ("") : ("s")} ago`)}</p>
                    <p>{JSON.stringify(post)}</p>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    <p>{post.likes}</p>
                    <p>{post.comments}</p>
                    {imageExists(post.image) ? (
                        <img src={post.image}/>
                    ) : (
                        null
                    )}
                </>
            ) : (null)}
        </div>
    )
}

export default PostPage;