import React from "react"

const FollowButton = ({id, setFollowingStatus}) => {

    const follow = async (event) => {
        event.preventDefault()
        const followResponse = await fetch(`/api/v1/follow/${id}`, {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" })
        })
        const parsedResponse = await followResponse.json()
        if (parsedResponse.followed) {
            setFollowingStatus(true)
        }
    }

    return (
        <button className="button" onClick={follow}>
            follow
        </button>
    )
}

export default FollowButton