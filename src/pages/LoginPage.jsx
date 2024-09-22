
// importing functions and components from react library
import { Link, redirect } from "react-router-dom"
import { useRef, useState } from "react"
import { useMutation, useQueryClient } from "react-query"

// importing api functions
import axios from "axios"

// importing components
import { PageTitle } from "../components/PageTitle"

// utils
import { redirectToPage } from "../utils/utils"
import ScrollAnimation from "react-animate-on-scroll"


export const LoginPage = () => {

    const loginRef = useRef(null)
    const passwordRef = useRef(null)
    const queryClient = useQueryClient()
    const [error, setError] = useState(null)

    const loginMutation = useMutation({
        mutationFn : async ({id}) => await axios.put(`http://localhost:3000/currentUser/`,{id : id, isLogged : true}),
        onSuccess : () => {
            queryClient.invalidateQueries("currentUser")
        }
    })

    const logIn = async () => {
        // getting fields
        const login = loginRef.current.value
        const password = passwordRef.current.value

        // validating fields
        if ( !login.length || !password.length ) { setError("All fields must be provided "); return; }
        
        //  checking data in database
        const users = await axios.get("http://localhost:3000/users/").then( (data) => { return data.data})
        const user = users.filter((e) => (e.login == login) && (e.password == password))

        if ( !user.length ) { setError("Login or password is invalid"); return }

        loginMutation.mutate({ id : user[0].id})

        redirectToPage("/")
    }


    return (
        
        <form method="POST" onSubmit={(e) => {
                e.preventDefault()
                logIn()
            }} className="form">
                <PageTitle title="Sign in" />

                <h2 className="titleOfForm">Login form</h2>

                <input ref={loginRef} type="text" className="inputField" placeholder="Login" name="login"/>
                <hr className="line" />

                <input ref={passwordRef} type="password" className="inputField" placeholder="Password" name="password"/>
                <hr className="line" />

                <p className="informationTag"> 
                    Haven't got account yet ?  

                    <Link to="/register" className="linkTo">
                        Click here
                    </Link>

                </p>

                { error != null && 
                <p className="errorMessage"> {error} </p>
                }

                <button className="btn-green mx-auto">Sign in</button>

            </form>
    )
}