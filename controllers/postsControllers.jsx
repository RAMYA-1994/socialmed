import Post from '../models/post.js';

// Create a post
export const createPost = async (req, res) => {
    const { title, content, tags } = req.body;
    const post = new Post({ title, content, tags, author: req.user.id });

    try {
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a post
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send('Post not found');

        if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).send('Permission Denied');
        }

        Object.assign(post, req.body);
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send('Post not found');

        if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).send('Permission Denied');
        }

        await post.remove();
        res.send('Post deleted');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
