import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { supabase } from "./client";
import Post from "./Post.jsx";

function App() {
  const [posts, setPosts] = useState([]);
  const [sortByCreationTime, setSortByCreationTime] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const orderColumn = sortByCreationTime ? "created_at" : "likes";
      
      const { data } = await supabase
          .from("Forum")
          .select()
          .order(orderColumn, { ascending: false });

        setPosts(data);
        console.log(data);
    }
    fetchPosts();
  }, [sortByCreationTime])

  return (
    <>
      <div className="sort">
        <p>Order by: </p>
        <button className={sortByCreationTime ? "sortSelectedButton" : "sortUnselectedButton"} onClick={() => {setSortByCreationTime(true)}}>Newest</button>
        <button className={sortByCreationTime ? "sortUnselectedButton" : "sortSelectedButton"} onClick={() => {setSortByCreationTime(false)}}>Most Popular</button>
      </div>
      <div className="postContainer">
        {posts && posts.length > 0 ? (
            [...posts]
                .map((post, index) => (
                    <Post 
                        key={post.id}
                        id={post.id}
                        created_at={post.created_at}
                        title={post.title}
                        content={post.content}
                        image={post.image}
                        comments={post.comments}
                        likes={post.likes}
                    />
                ))
        ) : (
            <p>No posts yet!</p>
        )}
      </div>
    </>
  )
}

export default App
