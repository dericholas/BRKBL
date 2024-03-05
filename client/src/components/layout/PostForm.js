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
                headers: { "Accept": "image/jpeg" },
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
    }

    const deleteImage = () => {
        setNewPost({ ...newPost, image: null });
    }

    const handleImageUpload = (acceptedImage) => {
        setNewPost({ ...newPost, image: acceptedImage[0] })
    }


    return (
        <div className="post-form-page">
            <h1>Share Something Cool!</h1>
            <form onSubmit={submitPost} className="post-form">
                {newPost.image ? (
                    <div className="file-drop">
                        <img src={URL.createObjectURL(newPost.image)} alt="Preview" />
                        <button onClick={deleteImage}>delete</button>
                    </div>
                ) : (
                    <Dropzone onDrop={handleImageUpload}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <img src="https://colorlib.com/wp-content/uploads/sites/2/jquery-file-upload-scripts.png" alt="Click to Browse or Drag and Drop Files" />
                                </div>
                            </section>
                        )}
                    </Dropzone>
                )
                }
                <label htmlFor="caption" >Caption:
                    <textarea name="caption" type="text" onChange={handleChange} placeholder="Give us the deets" />
                </label>
                <input type="submit" value="POST!" id="submit-post" />
            </form>
        </div>
    )
}

export default PostForm