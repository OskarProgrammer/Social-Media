
// importing functions and components from react library
import { useEffect } from "react"

// importing api functions
import { getCurrentUserInfo, getMessages } from "../api_functions/functions"
import axios from "axios"
import { useQuery } from "react-query"


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

    const { data : messages, refetch : refreshMessages } = useQuery({
        queryFn : () => getMessages(),
        queryKey : ["messages"],
        refetchInterval : 500,
    })

    return (
        <div className="messageContainer">

            <div className="titleOfMessages">
                Notifications {messages?.length} 
            </div>

        </div>
    )
}