import { useEffect, useState } from "react";
import API from "../services/api";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">

      <h1 className="home-title">
        📝 Latest Blogs
      </h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search Blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="posts-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
            />
          ))
        ) : (
          <h2 className="no-posts">
            No Blogs Found 😔
          </h2>
        )}
      </div>

    </div>
  );
}

export default Home;