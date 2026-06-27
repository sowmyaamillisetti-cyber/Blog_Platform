import { Link } from "react-router-dom";
import API from "../services/api";

function PostCard({ post }) {
  const likePost = async () => {
    try {
      await API.put(`/posts/${post._id}/like`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 5px 20px rgba(0,0,0,.15)",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-8px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0)";
      }}
    >
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
          }}
        />
      )}

      <div style={{ padding: "20px" }}>
        <h2
          style={{
            marginBottom: "10px",
            color: "#1e293b",
          }}
        >
          {post.title}
        </h2>

        <p
          style={{
            color: "#555",
            lineHeight: "1.6",
            minHeight: "70px",
          }}
        >
          {post.content.length > 120
            ? post.content.substring(0, 120) + "..."
            : post.content}
        </p>

        <p
          style={{
            color: "#2563eb",
            fontWeight: "bold",
          }}
        >
          👤 {post.author?.name || "Unknown"}
        </p>

        <div
className="post-card"
style={{
animation:"fadeUp .8s ease",
background:"#fff",
borderRadius:"18px",
overflow:"hidden",
boxShadow:"0 10px 25px rgba(0,0,0,.15)"
}}
>
          <button
            onClick={likePost}
            style={{
              border: "none",
              padding: "10px 15px",
              background: "#ef4444",
              color: "#fff",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ❤️ {post.likes || 0}
          </button>

          <Link
            to={`/post/${post._id}`}
            style={{
              background: "#2563eb",
              color: "#fff",
              padding: "10px 18px",
              textDecoration: "none",
              borderRadius: "8px",
            }}
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;