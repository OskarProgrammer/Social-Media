import axios from "axios";
import { useQuery } from "react-query";
import { getCommentsFromPost, getCurrentUserInfo, getMessages, getUserById } from "../api_functions/functions";


export const usePost = ({postID}) => useQuery({
    queryFn : async ({queryKey}) => await axios.get(`http://localhost:3000/posts/${queryKey[1]}`).then( (res) => { return res.data } ),
    queryKey : ["postInfo", postID],
})

export const useComments = ({postID}) => useQuery({
    queryFn: ({queryKey}) => getCommentsFromPost(queryKey[1]),
    queryKey: ["comments" , postID]
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
    refetchInterval : 300
})

