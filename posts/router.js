const router = require("express").Router();

router.get("/", function (req, res) {
  res.status(200).json({ router: "posts router" });
});

router.get("/:id", function (req, res) {
  res.status(200).json({ data: `details for student ${req.params.id}` });
});

module.exports = router;