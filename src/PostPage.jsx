import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "./client";

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

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
    
    return (
        <div>
            {post ? (<p>{JSON.stringify(post)}</p>) : (null)}
        </div>
    )
}

export default PostPage;