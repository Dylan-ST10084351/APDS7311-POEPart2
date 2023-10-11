const express = require('express')
const router = express.Router();
const post = require('../models/posts')
const checkauth = require('../check-auth')

router.get('', (req, res) => {
    Post.find().then((posts) => {
        res.json(
            {
                message: 'Posts found',
                posts:posts
            }
        )
    })
    })

router.post('', checkauth, (req,res) => {
    const post = new Post(
            {
                id: req.body.id,
                name: req.body.name
            }
        )
        post.save().then(()=>{
            res.status(201).json({
                message: 'Post created',
                post:post
            })
        })
    })
        
router.delete('/:id', checkauth, (req, res) => {
    Post.deleteOne({_id: req.params.id})
    .then((result) =>
    {
        res.status(200).json({message: "Post Deleted"});
    });
})

module.exports = router