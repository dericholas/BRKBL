import React, { useState } from "react"
import Dropzone from "react-dropzone"

const PostForm = (props) => {
    const [newPost, setNewPost] = useState({
        caption: "",
        image: ""
    })
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const submitPost = async (event) => {
        event.preventDefault()
        const newPostBody = new FormData()
        newPostBody.append("caption", newPost.caption)
        newPostBody.append("image", newPost.image)

        try {
            const submitPostResponse = await fetch("/api/v1/media", {
                method: "POST",
                headers: {"Accept": "image/jpeg"},
                body: newPostBody
            })            
            if (!submitPostResponse.ok) {
                if (submitPostResponse.status === 422) {
                    const serverData = await submitPostResponse.json()
                    const serverErrors = translateServerErrors(serverData.errors)
                    return setBuildFormErrors(serverErrors)
                } else {
                    const errorMessage = `${submitPostResponse.status} - ${submitPostResponse.statusText}`
                    const error = new Error(errorMessage)
                    throw (error)
                }
            }
        } catch (error) {
            console.error(`Error in POST: ${error}`)
        }
    }
    const handleChange = (event) => {
        event.preventDefault()
        setNewPost({
            ...newPost,
            [event.currentTarget.name]: event.currentTarget.value
        }
        )
        console.log("newPost", newPost)
    }
    const handleImageUpload = (acceptedImage) => {
        setNewPost({...newPost, image: acceptedImage[0]})
    }
    return (
        <>
            <form onSubmit={submitPost} className="post-form">
                <h1>make a new post</h1>
                <label htmlFor="caption" className="post-form">Caption:
                    <input name="caption" type="text" onChange={handleChange} />
                </label>
                <Dropzone onDrop={handleImageUpload}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
                <input type="submit" value="POST!" id="submit-post" />
            </form>
        </>
    )
}
export default PostForm