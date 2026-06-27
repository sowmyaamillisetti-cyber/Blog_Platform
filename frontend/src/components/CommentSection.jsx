import { useState, useEffect } from "react";
import API from "../services/api";

function CommentSection({ postId }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const res = await API.get(
      `/comments/${postId}`
    );

    setComments(res.data);
  };

  const addComment = async () => {
    const token = localStorage.getItem("token");

    await API.post(
      "/comments",
      {
        postId,
        text,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setText("");

    fetchComments();
  };

  return (
    <div>
      <h3>Comments</h3>

      <input
        type="text"
        placeholder="Write Comment"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <button onClick={addComment}>
        Add Comment
      </button>

      {comments.map((comment) => (
        <div key={comment._id}>
          <b>{comment.user?.name}</b>

          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentSection;