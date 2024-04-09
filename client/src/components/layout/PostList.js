import React, { useState, useEffect } from "react";
import PostTile from "./PostTile";

const PostList = (props) => {
    const [listOfPosts, setListOfPosts] = useState([])

    const getPosts = async() => {
        try {
            const response = await fetch("/api/v1/media")
            const parsedResponse = await response.json()
            console.log("FROM POSTLIST", parsedResponse)
            setListOfPosts(parsedResponse.postsData)
        } catch(error) {
            console.error(`Error Fetching Post List: ${error}`)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])
    console.log("listOfPosts", listOfPosts)
    let postTiles = [];
    if (listOfPosts.length > 0) {
        postTiles = listOfPosts.map((post) => {
            return (
                <PostTile
                    key={post.id}
                    post={post}
                />
            )
        }).reverse()
    }
    
    return (
        <div className="post-list">
            <ul>
                <h1>New Media</h1>
                {postTiles}
            </ul>
        </div>
      )
}

export default PostList