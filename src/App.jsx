import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { supabase } from "./client";
import Post from "./Post.jsx";

function App() {
  const [posts, setPosts] = useState([]);
  const [sortByCreationTime, setSortByCreationTime] = useState(true);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(null);

  const searchItems = () => {
    if (search && search !== "") {
      setFiltered(
        posts.filter((post) => {
          return Object.values(post)
            .join("")
            .toLowerCase()
            .includes(search.toLowerCase())
        })
      )
    } else {
      setFiltered(posts);
    }
  }

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

  useEffect(() => {
    searchItems();
  }, [search, posts])

  return (
    <div className="dashboard">
      <div className="sort">
        <p>Order by: </p>
        <button className={sortByCreationTime ? "sortSelectedButton" : "sortUnselectedButton"} onClick={() => {setSortByCreationTime(true)}}>Newest</button>
        <button className={sortByCreationTime ? "sortUnselectedButton" : "sortSelectedButton"} onClick={() => {setSortByCreationTime(false)}}>Most Popular</button>
      </div>
      <input 
        type="text" 
        placeholder="Search..."
        onChange = {(inputString) => setSearch(inputString.target.value)}
      />
      <div className="postContainer">
        {filtered && filtered.length > 0 ? (
            [...filtered]
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
    </div>
  )
}

export default App
