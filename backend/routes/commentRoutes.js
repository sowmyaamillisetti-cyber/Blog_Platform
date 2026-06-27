import express from "express";
import Comment from "../models/Comment.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= CREATE COMMENT =================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { comment, post } = req.body;

    if (!comment || !post) {
      return res.status(400).json({
        message: "Comment and Post ID are required",
      });
    }

    const newComment = await Comment.create({
      comment,
      post,
      author: req.user.id,
    });

    res.status(201).json({
      message: "Comment Added Successfully",
      comment: newComment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});
// ================= GET COMMENTS OF A POST =================
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});
// ================= DELETE COMMENT =================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Only comment owner can delete
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    await comment.deleteOne();

    res.json({
      message: "Comment Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;