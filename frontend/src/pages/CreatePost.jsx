import { useState } from "react";
import API from "../services/api";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/posts",
        {
          title,
          content,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Post Created Successfully");

      setTitle("");
      setContent("");
      setImage("");
    } catch (error) {
      console.error(error);
      alert("Failed to create post");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create New Blog Post</h2>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="text"
          placeholder="Paste Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            style={{
              width: "300px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          />
        )}

        <textarea
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="8"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;