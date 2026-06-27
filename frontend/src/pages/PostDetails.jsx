import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Comments from "../components/Comments";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await API.get(`/posts/${id}`);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Post Deleted Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to delete post");
    }
  };

  if (!post) return <h2>Loading...</h2>;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />
      )}

      <h1>{post.title}</h1>

      <p>{post.content}</p>

      <hr />

      <h4>👤 Author : {post.author?.name}</h4>

      <p>
        📅{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <button
        onClick={deletePost}
        style={{
          background: "red",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Delete Post
      </button>

      <hr />

      <Comments postId={id} />
    </div>
  );
}

export default PostDetails;