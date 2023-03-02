import Post from "../models/Post.js"
import User from "../models/User.js"

/* CREATE */
export const createPost = async (req, res) => {
    try {
        //req.body for sending sensitive data, or super long json data
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save();

        //grabbing news feed
        const post = await Post.find();
        res.status(201).json(post);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};


/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        //grabbing news feed
        //grabs all posts in general
        const post = await Post.find()
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params 
        //searches thru post database, and gets posts with matching userId
        //allows us to essentially get posts created by a certain user
        const posts = await Post.find({ userId })
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


/* UPDATE */
export const likePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const post = await Post.findById(id); //get posts by id
      const isLiked = post.likes.get(userId); //gets post by id and gets posts that have been liked by user
  
      //if the liked post exists, then delete it because we are unliking it
      if (isLiked) {
        post.likes.delete(userId);
      } else {
        post.likes.set(userId, true);
      }
  
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true }
      );
  
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
};