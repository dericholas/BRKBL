
for user:
users posts
username
createdAt
(likes
comments
messages
trips)


follow list: 



list of followers
for each- username, followingUser, currentUserIsFollowing, follow/unfollow button

list of following 
for each- username, followedUserId, currentUserIsFollowed, follow/unfollow button


currentUser: {
    username,
    posts,
    createdAt,
    followers: [
        follower: {
            id
            username
            currentUserIsFollowing
        }
    ]
    followers: [
        follower: {
            id
            username
            currentUserIsFollowed
        }
    ]

}
/////////////////
once data is present:
followers/following become 