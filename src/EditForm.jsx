import { useState, useEffect } from 'react';
import { supabase } from './client.js';
import { useParams, Link } from "react-router-dom"
import Post from './Post.jsx';

const Form = () => {
    const { id } = useParams();

    const [data, setData] = useState(null);

    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    useEffect(() => {
        const fetchPost = async () => {
            const { data: post, error } = await supabase
                .from("Forum")
                .select()
                .eq('id', id)
                .single();
                
            setData(post);
        };
        fetchPost().catch(console.error);
    }, [])

    const editPost = async (event) => {
        event.preventDefault();

        if (!data.title || data.title == "") {
            setError("You must add a title.");
            return;
        }

        await supabase
            .from('Forum')
            .update({
                title: data.title,
                image: data.image,
                content: data.content,
            })
            .eq('id', id);

        window.location = "/";
    }
    
    return (
        <>
                {data ? (
                    <div className="formContainer">
                        <h2>Edit {data.title}</h2>
                        <form>
                            <div>
                                <label htmlFor="">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    placeholder="Enter a title..."
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="">Image URL (optional)</label>
                                <input
                                    type="text"
                                    id="image"
                                    name="image"
                                    value={data.image}
                                    placeholder="Insert Image URL here..."
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="">Content</label>
                                <textarea
                                    rows="5"
                                    cols="50"
                                    id="content"
                                    name="content"
                                    value={data.content}
                                    placeholder="Write about your topic..."
                                    onChange={handleChange}
                                />
                            </div>
                            <input
                                type="submit"
                                id="title"
                                name="title"
                                placeholder="Insert Image URL here..."
                                onClick={editPost}
                            />
                        </form>
                    </div>
                ) : (null)}
        </>
    )
}

export default Form;