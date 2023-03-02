import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget"


/**
 * Wrapper Component for posts
 * getPosts is gonna grab all posts from anyone on the home page (getFeedPosts middleware)
 * getUserPosts can also grab all posts from a specific user when navigating into their page (getUserPosts)
 * This is determined through if statement in useEffect (when component gets rendered for the first time)
 */
const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)

    const getPosts = async () => {
        const response = await fetch("http://localhost:3001/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json()
        dispatch(setPosts({ posts: data }))
    }

    const getUserPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json()
        dispatch(setPosts({ posts: data }))
    }

    useEffect(() => {
        if (isProfile) {
            getUserPosts()
        } else {
            getPosts()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {/**Print posts in reverse order to simulate an actual social media site */}
            {posts.slice(0).reverse().map(  
                //destructure info 
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    )
}

export default PostsWidget