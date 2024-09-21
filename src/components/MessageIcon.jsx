
// importing functions and components from react library
import { useQuery } from "react-query"
import { NavLink } from "react-router-dom"

// importing api functions
import { getAmountOfMessages } from "../api_functions/functions"


export const MessageIcon = () => {

    const { data : amountOfMessages } = useQuery({
        queryFn : () => getAmountOfMessages(),
        queryKey : ["amount"]
    })

    return (
        <NavLink to="/account/messages" className="messageIcon">
            <p className={`amountMessages ${amountOfMessages > 0 ? "bg-red-600" : ""}`}>{amountOfMessages}</p>
            <i className="bi bi-chat-fill text-[30px]"/>
        </NavLink>
    )
}