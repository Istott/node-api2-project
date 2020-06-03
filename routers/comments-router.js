const express = require("express");
const Posts = require("../data/db");

// note the R (uppercase) and the invokation ()
const router = express.Router();

// endpoint for /api/posts/:id/comments
router.get("/:id/comments", (req, res) => {
  Posts.findCommentById(req.params.id)
    .then(comment => {
      if (comment) {
        res.status(200).json(comment);
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
  const { id } = req.params;
  const comment = { ...req.body, post_id: id };

  Posts.findById(id)
    .then(post => {
      if (post.length) {
        if (comment.text) {
          Posts.insertComment(comment)
            .then(newComment => {
              res.status(201).json(newComment);
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: "There was an error while saving to the database"
              });
            });
        } else {
          res.status(404).json({ message: "Comment is missing." });
        }
      } else {
        res.status(404).json({ message: "The id is not in database" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the comment to the database."
      });
    });
});

// router.post("/:id/comments", (req, res) => {
//   const postId = req.params.id;
//   const postComment = req.body;

//   Posts.findById(postId)
//     .then(data => {
//       if (data.length !== 0) {
//         if(!postComment.text) {
//           res.status(400)
//           .json({errorMessage: "Please provide text for the comment."});
//         } else {
//           Posts.insertComment({ ...postComment, postId })
//             .then(commentId => {
//               Posts.findCommentById(commentId).then(newComment => {
//                 res.status(201).json(newComment)
//               });
//             })
//             .catch(err => {
//               res.status(500).json({
//                 message: "There was an error while saving the post to the database.",
//               });
//             });
//         }
//       } else {
//         res
//           .status(404)
//           .json({ message: "The post with the specified ID does not exist." });
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err)
//     })
// });

// router.post("/:id/comments", (req, res) => {
//   const {id: postId }= req.params;
//   const {body: postComment} = req;

//   Posts.findById(postId)
//     .then(data => {
//       if (data.length !== 0) {
//         if(!postComment.text) {
//           res.status(400)
//           .json({errorMessage: "Please provide text for the comment."});
//         } else {
//           Posts.insertComment({ ...postComment, postId })
//             .then(({id: commentId}) => {
//               Posts.findCommentById(commentId).then(newComment => {
//                 res.status(201).json(newComment)
//               });
//             })
//             .catch(err => {
//               res.status(500).json({
//                 message: "There was an error while saving the post to the database.",
//               });
//             });
//         }
//       } else {
//         res
//           .status(404)
//           .json({ message: "The post with the specified ID does not exist." });
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err)
//     })
// });

// router.post("/:id/comments", (req, res) => {
//   const id = req.params.id;
//   if (req.body.text === undefined) {
//     res.status(400).json({
//       errorMessage: "Please provide text for the comment.",
//     });
//   }
//   Posts.findCommentById(id)
//     .then((comments) => {
//       Posts.insertComment(comment);
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

module.exports = router;