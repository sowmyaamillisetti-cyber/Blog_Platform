import { useEffect, useState } from "react";
import API from "../services/api";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    if (!comment.trim()) {
      return alert("Please enter a comment");
    }

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/comments",
        {
          comment,
          post: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComment("");
      fetchComments();
    } catch (error) {
      console.log(error);
      alert("Failed to add comment");
    }
  };

  const deleteComment = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchComments();
    } catch (error) {
      console.log(error);
      alert("Failed to delete comment");
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Comments</h2>

      <textarea
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="3"
        style={{
          width: "100%",
          padding: "10px",
        }}
      />

      <br />
      <br />

      <button onClick={addComment}>
        Add Comment
      </button>

      <hr />

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h4>{item.author?.name}</h4>

            <p>{item.comment}</p>

            <small>
              {new Date(item.createdAt).toLocaleString()}
            </small>

            <br />
            <br />

            <button
              onClick={() =>
                deleteComment(item._id)
              }
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Comments;