import React, { useState, useEffect } from "react";
import PostTile from "./PostTile";

const PostList = (props) => {
    const [listOfPosts, setListOfPosts] = useState([])

    const getPosts = async() => {
        try {
            const response = await fetch("/api/v1/media")
            const parsedResponse = await response.json()
            // console.log("parsedResponse". parsedResponse)
            setListOfPosts(parsedResponse.posts)
        } catch(error) {
            console.error(`Error Fetching Post List: ${error}`)
        }
    }
    
    useEffect(() => {
        getPosts()
    }, [])

    console.log("listOfPosts", listOfPosts)
    let postTiles = null;
    if (listOfPosts.length > 0) {
        postTiles = listOfPosts.map((post) => {
            console.log("post", post)
            return (
                <PostTile
                    key={post.id}
                    post={post}
                />
            )
        })
    }
    console.log("postTiles", postTiles)

    return (
        <>
            <h1>Hello</h1>
            <ul>
                {postTiles}
            </ul>
        </>
      )
}

export default PostList