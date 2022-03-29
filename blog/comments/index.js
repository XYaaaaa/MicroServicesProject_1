const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/commments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/commments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const commments = commentsByPostId[req.params.id] || [];

    commentsByPostId.push( {id: commentId, content});

    commentsByPostId[req.params.id] = commments;

    res.status(201).send(commments);
});

app.listen(4001, () =>{
    console.log('listening on port 4001');
});