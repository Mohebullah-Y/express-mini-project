const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;
const app = express();

//setup static folder
// app.use(express.static(path.join(__dirname, 'public')));

let posts = [
   {id:1, title: 'post One'},
   {id:2, title: 'post Two'},
   {id:3, title: 'post Three'},
];

// Get all posts
app.get('/api/posts', (req, res)=>{
    //working with query
    const limit = parseInt(req.query.limit);
    if(!isNaN(limit) && limit > 0){
        res.status(200).json(posts.slice(0, limit));
    }
    res.status(200).json(posts);
});

// Get single posts
app.get('/api/posts/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if(!post){
     return res.status(404).json({msg: `A post with the id of ${id} was not found`});
    }
    res.status(200).json(post);
    
});

/*
app.get('/', (req, res) => {
    // res.send('Hello World');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    // res.send('About');
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
*/

app.listen(port, () => console.log(`Server is running on port ${port}`));


