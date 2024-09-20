
// importing functions and components from react library
import { useEffect } from "react"
import { useQuery } from "react-query"

// importing api functions
import { getCurrentUserInfo, getMessages } from "../api_functions/functions"
import axios from "axios"

// importing components
import { NotificationItem } from "../components/NotificationItem"

// importing custom hooks
import { useMessages } from "../custom_hooks/custom"


const useTransferMessages = () => {
    
    const transferData = async () => {
        let currentUser = await getCurrentUserInfo()

        currentUser.readMessages.push(...currentUser.messages)
        currentUser.messages = []

        try {
            await axios.put(`http://localhost:3000/users/${currentUser.id}`, currentUser)
        } catch { throw new Error("Error during transfering messages")}
    }

    useEffect(()=>{
        transferData() 
    }, [])

}

export const MessagesPage = () => {

    useTransferMessages()

    const { data : messages } = useMessages()

    const removeNoti = async (notifyID) => {
        // getting current user
        let currentUser = await getCurrentUserInfo()
    
        currentUser.readMessages = currentUser.readMessages.filter((e) => e != notifyID)

        try {
            await axios.put(`http://localhost:3000/users/${currentUser.id}`, currentUser)
        } catch { throw new Error("Error during removing notification")}
        
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