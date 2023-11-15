const Post = require("../models/Post.js");
const User = require("../models/User.js");

const PostController = {

    async create(req, res) { 
        try {
            const post = await Post.create({...req.body, userId: req.user._id});
            res.status(201).send({message: "Post created successfully", post});
        } catch (error) {
            console.error(error);
            res.status(500).send({message: "Error during post creation", error})
        }
    },

    async findAll(req, res) {
        try {
            const posts = await Post.find();
            res.status(200).send(posts);
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },

    async findById(req, res) {
        try {
            const paramsId = req.params._id;
            const postById = await Post.findById({_id: paramsId});
            if (!postById) {
                return res.status(400).send(`Id ${paramsId} not exists in DB`);
            };
            res.status(200).send({message: `Found post with id ${paramsId}`, postById});
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },

    async update(req, res) {
        try {
            const paramsId = req.params._id;
            const postById = await Post.findById({_id: paramsId});
            if (!postById) {
                return res.status(400).send(`Id ${paramsId} not exists in DB`);
            };
            const post = await Post.findByIdAndUpdate(
                paramsId,
                req.body,
                { new: true }
            );
          res.status(200).send({message: `Post with id ${paramsId} updated`, post});
        } catch (error) {
          console.error(error);
          res.status(500).send(error);
        }
    },

    async insertLike(req, res) {
        try {
            if (!req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).send({message: 'Invalid ID'});
            };
            const post = await Post.findById(req.params._id);
            console.log(!post);
            if (!post) {
                return res.status(400).send(`Post does not exist in DB`);
            } else if (post.likes.includes(req.user._id)) {
                return res.status(400).send({message: `${req.user.name} already liked this post`});
            } else {
                await Post.findByIdAndUpdate(
                    req.params._id,
                    {$push: {likes: req.user._id}},
                    {new: true}
                );
            };
            res.status(201).send({message: `${req.user.name} likes post with id: ${req.params._id}`});
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async deleteLike(req, res) {
        try {
            const paramsId = req.params._id;
            const post = await Post.findById(
                paramsId,
                {$pull: {likes: {userId:req.user._id}}},
                {new: true}
            );
            if (!post) {
                return res.status(400).send(`Post with id ${paramsId} not exists in DB`);
            };
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async delete(req, res) {
        try {
            const paramsId = req.params._id;
            const postById = await Post.findById(paramsId);
            if (!postById) {
                return res.status(400).send(`Post with id ${paramsId} not exists in DB`);
            };
            const post = await Post.findByIdAndDelete(paramsId);
            res.send({message: `Post with id ${paramsId} deleted`});
        } catch (error) {
            console.error(error);
            res.status(500).send({message: `Error trying to remove post with id ${paramsId}`, error});
        }
      }
};

module.exports = PostController;