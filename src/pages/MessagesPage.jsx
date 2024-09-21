
// importing functions and components from react library
import { useEffect } from "react"
import { useMutation, useQueryClient } from "react-query"

// importing api functions
import { getCurrentUserInfo } from "../api_functions/functions"
import axios from "axios"

// importing components
import { NotificationItem } from "../components/NotificationItem"

// importing custom hooks
import { useCurrentUser, useMessages } from "../custom_hooks/custom"
import { removeNotify } from "../utils/utils"


const useTransferMessages = () => {
    const queryClient = useQueryClient()
    
    const transferData = async () => {
        let currentUser = await getCurrentUserInfo()

        currentUser.readMessages.push(...currentUser.messages)
        currentUser.messages = []

        try {
            await axios.put(`http://localhost:3000/users/${currentUser.id}`, currentUser)
        } catch { throw new Error("Error during transfering messages")}

        queryClient.invalidateQueries(["currentUser"])
    }

    useEffect(()=>{
        transferData() 
    }, [])

}

export const MessagesPage = () => {

    useTransferMessages()

    const { data : messages } = useMessages()
    const { data : currentUser} = useCurrentUser()
    const queryClient = useQueryClient()

    const removeNotiMutation = useMutation({
        mutationFn : removeNotify,
        onSuccess : () => {
            queryClient.invalidateQueries(["messages"])
        }
    })

    const removeNoti = async (notifyID) => {
        currentUser.readMessages = currentUser.readMessages.filter((e) => e != notifyID)

        removeNotiMutation.mutate( { user  : currentUser} )
    }

    return (
        <div className="messageContainer">

            <div className="titleOfMessages">
                Notifications {messages?.length} 
            </div>

            <div className="messagesList">
                {messages?.map( message => (
                        <NotificationItem key={message} notifyID={message} onRemove={removeNoti}/>
                ))}
            </div>

        </div>
    )
}