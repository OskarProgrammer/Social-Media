import axios from "axios";
import { useQuery } from "react-query";
import { getAuthorOfNotification, getCommentsFromPost, getCommentsOfUser, getCurrentUserInfo, getLikesOfUser, getMessages, getNotification, getPostsOfUser, getUserById } from "../api_functions/functions";


export const usePost = ({postID}) => useQuery({
    queryFn : async ({queryKey}) => await axios.get(`http://localhost:3000/posts/${queryKey[1]}`).then( (res) => { return res.data } ),
    queryKey : ["postInfo", postID],
})

export const useComments = ({postID}) => useQuery({
    queryFn: ({queryKey}) => getCommentsFromPost(queryKey[1]),
    queryKey: ["comments" , postID]
})

export const useCommentsOfUser = ({userID}) => useQuery({
    queryFn : ({queryKey}) => getCommentsOfUser(queryKey[1]),
    queryKey : ["comments", userID]
})

export const useAuthor = ({ownerID}) => useQuery({
    queryFn : ({queryKey}) => getUserById(queryKey[1]),
    queryKey : ["authorInfo", ownerID]
})

export const useCurrentUser = () => useQuery({
        queryFn: () => getCurrentUserInfo(),
        queryKey: ["currentUser"]
})

export const useMessages = () => useQuery({
    queryFn : () => getMessages(),
    queryKey : ["messages"],
    refetchInterval : 500
})

export const useFollower = ({followerID}) => useQuery({
    queryFn : ({queryKey}) => getUserById(queryKey[1]),
    queryKey : ["follower", followerID]
})

export const useFollowing = ({followingID}) => useQuery({
    queryFn : ({queryKey}) => getUserById(queryKey[1]),
    queryKey : ["following", followingID]
})

export const useLikes = ({userID}) => useQuery({
    queryFn : ({queryKey}) => getLikesOfUser(queryKey[1]),
    queryKey : ["likes", userID]
})

export const usePosts = ({userID}) => useQuery({
    queryFn : ({queryKey}) => getPostsOfUser(queryKey[1]),
    queryKey : ["posts", userID]
})

export const useNotification = ({notifyID}) => useQuery({
    queryFn : ({queryKey}) => getNotification(queryKey[1]),
    queryKey : ["notification", notifyID]
})

export const useNotifyAuthor = ({notifyID}) => useQuery({
    queryFn : ({queryKey}) => getAuthorOfNotification(queryKey[1]),
    queryKey : ["notifyAuthor", notifyID]
}) 
