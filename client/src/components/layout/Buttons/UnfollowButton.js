import React from "react"

const UnfollowButton = ({id, setFollowingStatus}) => {

    const unfollow = async (event) => {
        event.preventDefault()
        const unfollowResponse = await fetch(`/api/v1/follows/${id}`, {
            method: "DELETE",
            headers: new Headers({ "Content-Type": "application/json" })
        })
        const parsedResponse = await unfollowResponse.json()
        if (parsedResponse.unfollowed) {
            setFollowingStatus(false)
        }
    }

    return (
        <button className="button" onClick={unfollow}>
            following
        </button>
    )
}

export default UnfollowButton