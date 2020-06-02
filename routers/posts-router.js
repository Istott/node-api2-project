const express = require("express");
const Posts = require("../data/db");

// not the R (uppercase) and the invokation ()
const router = express.Router();

// we only care about what follows /api/hubs
router.get("/", (req, res) => {
//   const query = req.query;
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the hubs",
      });
    });
});

// endpoint for /api/hubs/:id
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "post not found" });
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

router.post("/", (req, res) => {
  const post = req.body

  if(!post.title || !post.contents) {
    res.status(400).json({errorMessage: "Please provide title and contents for the post."});
  } else {
      try {
          Posts.insert(post);
          res.status(201).json(Posts);
      }
       catch (err) {
          res.status(500).json({errorMessage: "There was an error while saving the post to the database."});
      } 
  }
});


router.delete("/:id", (req, res) => {
  Hubs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The hub has been nuked" });
      } else {
        res.status(404).json({ message: "The hub could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error removing the hub",
      });
    });
});

// router.put("/:id", (req, res) => {
//   const changes = req.body;
//   Hubs.update(req.params.id, changes)
//     .then(hub => {
//       if (hub) {
//         res.status(200).json(hub);
//       } else {
//         res.status(404).json({ message: "The hub could not be found" });
//       }
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: "Error updating the hub",
//       });
//     });
// });

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