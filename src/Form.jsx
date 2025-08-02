import { useState } from 'react';
import { supabase } from './client.js';
import Post from './Post.jsx';

const Form = () => {

    const [data, setData] = useState({
        title: "",
        image: "",
        content: "",
    });

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

    const createPost = async (event) => {
        event.preventDefault();

        if (!data.title || data.title == "") {
            setError("You must add a title.");
            return;
        }

        await supabase
            .from('Forum')
            .insert({
                title: data.title,
                image: data.image,
                content: data.content,
            })
            .select();

        window.location = "/";
    }
    
    return (
        <>
            <div className="formContainer">
                <h2>Create a new post</h2>
                <form>
                    <div>
                        <label htmlFor="">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
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
                            placeholder="Write about your topic..."
                            onChange={handleChange}
                        />
                    </div>
                    <input
                        type="submit"
                        id="title"
                        name="title"
                        placeholder="Insert Image URL here..."
                        onClick={createPost}
                    />
                </form>
            </div>
        </>
    )
}

export default Form;