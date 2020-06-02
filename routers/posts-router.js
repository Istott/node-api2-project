const express = require("express");
const Hubs = require("../data/db");

// not the R (uppercase) and the invokation ()
const router = express.Router();

// we only care about what follows /api/hubs
// router.get("/", (req, res) => {
// //   const query = req.query;
//   Hubs.find()
//     .then(posts => {
//       res.status(200).json(posts);
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: "Error retrieving the hubs",
//       });
//     });
// });

// endpoint for /api/hubs/:id
router.get("/:id/comments", (req, res) => {
  Hubs.findById(req.params.id)
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

// router.post("/", (req, res) => {
//   Hubs.add(req.body)
//     .then(hub => {
//       res.status(201).json(hub);
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: "Error adding the hub",
//       });
//     });
// });
// router.delete("/:id", (req, res) => {
//   Hubs.remove(req.params.id)
//     .then(count => {
//       if (count > 0) {
//         res.status(200).json({ message: "The hub has been nuked" });
//       } else {
//         res.status(404).json({ message: "The hub could not be found" });
//       }
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: "Error removing the hub",
//       });
//     });
// });
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