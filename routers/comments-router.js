const express = require("express");
const Hubs = require("../data/db");

// note the R (uppercase) and the invokation ()
const router = express.Router();

// endpoint for /api/posts/:id/comments
router.get("/:id/comments", (req, res) => {
  Hubs.findCommentById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "post comment not found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post",
      });
    });
});

module.exports = router;