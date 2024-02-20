import React, { useEffect, useState } from "react";

const UserShow = ({user}) => {

    const [profileData, setProfileData] = useState({})
    const userId = user.id
    console.log(user)
    const getUserData = async () => {
        try {
            const fetchedProfileData = await fetch(`/api/v1/profile/${userId}`)
            const parsedProfileData = await fetchedProfileData.json()
            console.log("parsedProfileData", parsedProfileData)
            setProfileData(parsedProfileData)
        } catch (error) {
            console.error(error)
        }
    }
    console.log("profileData", profileData)
    useEffect(() => {
        getUserData()
    }, [])


    return (
        <h2>sup nerdz</h2>
    )

}
export default UserShow