// importing axios
import axios from "axios"

export const getCurrentUserInfo = async () => {

    let currentUser = {}
    // getting currentUser
    try{
        currentUser = await axios.get("http://localhost:3000/currentUser/").then((response)=>{return response.data})
                                                                             .catch((error)=>{return error})

        currentUser = await axios.get(`http://localhost:3000/users/${currentUser.id}`).then((response) => {return response.data})
                                                                                      .catch((error) => {return error})
    } catch { throw new Error("Error during getting current user")}

    return currentUser
}