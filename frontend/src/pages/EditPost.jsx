import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function EditPost() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    const res = await API.get(`/posts/${id}`);

    setTitle(res.data.title);
    setContent(res.data.content);
    setImage(res.data.image || "");
  };

  const updatePost = async () => {
    const token = localStorage.getItem("token");

    await API.put(
      `/posts/${id}`,
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

    alert("Post Updated");
  };

  return (
    <div>
      <h2>Edit Post</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <br /><br />

      {image && (
        <img
          src={image}
          alt="Preview"
          width="250"
        />
      )}

      <br /><br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <button onClick={updatePost}>
        Update Post
      </button>
    </div>
  );
}

export default EditPost;