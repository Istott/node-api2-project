const express = require("express");
const Posts = require("../data/db");

// note the R (uppercase) and the invokation ()
const router = express.Router();

// endpoint for /api/posts/:id/comments
router.get("/:id/comments", (req, res) => {
  Posts.findCommentById(req.params.id)
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

router.post("/:id/comments", (req, res) => {
  const post = req.params.id

  if(req.body.text === undefined) {
    res.status(400).json({errorMessage: "Please provide title and contents for the post."});
  } else {
      try {
          Posts.insertComment(post);
          res.status(201).json(Posts);
      }
       catch (err) {
          res.status(500).json({errorMessage: "There was an error while saving the post to the database."});
      } 
  }
});

module.exports = router;

// router.post("/:id/comments", (req, res) => {
//   const id = req.params.id;
//   if (req.body.text === undefined) {
//     res.status(400).json({
//       errorMessage: "Please provide text for the comment.",
//     });
//   }
//   db.findCommentById(id)
//     .then((comments) => {
//       db.insertComment(comment);
//       if (comments) {
//         res.status(201).json(comments);
//       } else {
//         res
//           .status(404)
//           .json({ message: "The post with the specified ID does not exist." });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: "There was an error while saving the comment to the database",
//       });
//     });
// });