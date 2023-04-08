const express = require('express');
const dummyBlogs = require('./resource/dummyData');
const app = express();
const PORT = 3000;

app.get('/blog/posts', (req, res) => {
    try{
        const response = dummyBlogs.filter(post => post.status === 'PUBLISHED');
        res.json(response);
    } catch(err){
        res.status(500).json({ error: 'Unable to retrieve blogs' });
    }
});

app.get('/blog/posts/:authorId', (req, res) => {
  const authorId = parseInt(req.params.authorId);
  try {
  const response = dummyBlogs.filter(post => post.author === authorId && post.status === 'PUBLISHED');
  res.json(response);
  } catch(err){
    res.status(500).json({ error: 'Unable to retrieve blog' });
  }
});

app.get('/blog/posts/date/:date', (req, res) => {
  const date = new Date(req.params.date);
  try {
  const response = dummyBlogs.filter(post => new Date(post.publishedAt) > date && post.status === 'PUBLISHED');
  res.json(response);
  } catch(err){
    res.status(500).json({ error: 'Unable to retrieve blog by Date' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
