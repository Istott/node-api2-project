const express = require('express');

const postsRouter = require('./routers/posts-router.js');
const commentsRouter = require('./routers/comments-router.js')

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);
server.use("/api/comments", commentsRouter)

server.get("/", (req, res) => {
    res.status(200).json('sup homies');
});

server.get('/api/posts/', (req, res) => {
  res.status(200).json({ data: `lessons router`});
});

// server.get('/api/lessons/:id', (req, res) => {
//   res.status(200).json({ data: `details for lesson ${req.params.id}`});
// });

server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n');
  });