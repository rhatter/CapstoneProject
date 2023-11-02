const express = require("express");
const commentModel = require("../models/commentModel");

//const validatePost = require("../middlewares/validatePost");

const comment = express.Router();

//faccio la get per titolo con la query
//chiaramente devi chiamare questa route per fare il "filtro" per titolo
//lato frontend scriverò una cosa del genere  `http://localhost:5050/posts/bytitle?articleID=nomedeltitolo`
comment.get("/comment/byArticle", async (req, res) => {
  const { articleID } = req.query;

  try {
    const postByTitle = await commentModel
      .find({
        postID: articleID,
      })
      .populate("authorID");

    res.status(200).send(postByTitle);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Errore interno del server",
    });
  }
});

//creazione del Post
comment.post("/comment/create", async (req, res) => {
  const newComment = new commentModel({
    authorID: req.body.authorID,
    postID: req.body.postID,
    content: req.body.content,
  });

  try {
    const comment = await newComment.save();
    res.status(201).send({
      statusCode: 201,
      message: "Comment saved successfully",
      payload: comment,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Errore interno del server",
      error: e,
    });
  }
});

comment.patch("/comment/update/:commentId", async (req, res) => {
  const { commentId } = req.params;

  const postExist = await PostModel.findById(postId);

  if (!postExist) {
    return res.status(404).send({
      statusCode: 404,
      message: "This post does not exist!",
    });
  }
  const verifyAuthor = postExist.authorID === req.body.authorID;
  if (verifyAuthor) {
    try {
      const dataToUpdate = req.body;
      const options = { new: true };
      const result = await PostModel.findByIdAndUpdate(
        commentId,
        dataToUpdate,
        options
      );

      res.status(200).send({
        statusCode: 200,
        message: "Post edited successfully",
        result,
      });
    } catch (e) {
      res.status(500).send({
        statusCode: 500,
        message: "Errore interno del server",
      });
    }
  } else {
    res.status(500).send({
      statusCode: 500,
      message: "L'autore non è corretto",
    });
  }
});

comment.delete("/comment/delete/:commentID", async (req, res) => {
  const { commentID } = req.params;

  try {
    const comment = await commentModel.findByIdAndDelete(commentID);
    if (!comment) {
      return res.status(404).send({
        statusCode: 404,
        message: "Post not found or already deleted!",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "Post deleted successfully",
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Errore interno del server",
    });
  }
});

module.exports = comment;
