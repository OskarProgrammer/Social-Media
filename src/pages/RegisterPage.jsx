
// importing funcitons and components from react library
import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import { useMutation } from "react-query"

// importing api functions
import axios from "axios"

// importing componenst
import { PageTitle } from "../components/PageTitle"
import { redirectToPage } from "../utils/utils"


export const RegisterPage = () => {

    const loginRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const [error, setError] = useState(null)

    const regInMutation = useMutation({
        mutationFn : async ({id}) => await axios.put(`http://localhost:3000/currentUser/`,{id : id, isLogged : true}),
        onSuccess : () => {
            queryClient.invalidateQueries("currentUser")
        }
    })

    const regIn = async () => {
        const login = loginRef.current.value
        const password = passwordRef.current.value
        const confirmPassword = confirmPasswordRef.current.value

        // validating fields
        if ( !login.length || !password.length || !confirmPassword.length ) { setError("All fields must be provided "); return }
        if ( password != confirmPassword ) { setError("Password and confirm password must be the same"); return }

        //  checking data in database
        const users = await axios.get("http://localhost:3000/users/").then( (data) => { return data.data } )
        const user = users.filter((e) => (e.login == login))

        if ( user.length ) { setError("This login is taken already"); return }

        const newUser = {
            id : crypto.randomUUID(),
            login : login,
            password : password,
            followers : [],
            following : [],
            messages : [],
            readMessages : []
        }

        try {
            await axios.post("http://localhost:3000/users/", newUser)
        } catch { setError("Something went wrong during creating account"); return } 

        regInMutation.mutate({id: newUser.id})

        redirectToPage("/")
    }

    return (
        <form method="POST" onSubmit={(e) => {
            e.preventDefault()
            regIn()
        }} className="form">
            
            <PageTitle title="Sign up"/>

            <h2 className="titleOfForm">Register form</h2>

            <input ref={loginRef} type="text" className="inputField" placeholder="Login" name="login"/>
            <hr className="line" />

            <input ref={passwordRef} type="password" className="inputField" placeholder="Password" name="password"/>
            <hr className="line" />

            <input ref={confirmPasswordRef} type="password" className="inputField" placeholder="Confirm password" name="confirmPassword"/>
            <hr className="line" />

            <p className="informationTag"> 
                Have got account already ?  

                <Link to="/login" className="linkTo">
                    Click here
                </Link>

            </p>

            { error && <p className="errorMessage"> {error} </p>  }

            <button className="btn-green mx-auto">Sign up</button>

        </form>
    )
}
