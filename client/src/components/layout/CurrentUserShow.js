import React, { useEffect, useState } from "react";

const CurrentUserShow = ({user}) => {

    const [profileData, setProfileData] = useState({})
    const userId = user.id
    console.log(user)
    const getUserData = async () => {
        try {
            const fetchedProfileData = await fetch(`/api/v1/profile/${userId}`)
            const parsedProfileData = await fetchedProfileData.json()
            setProfileData(parsedProfileData)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getUserData()
    }, [])

    const postList = profileData.posts

    return (
        <h2>sup nerdz</h2>
    )

}
export default CurrentUserShow