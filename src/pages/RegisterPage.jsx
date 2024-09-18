
// importing funcitons and components from react library
import { Form, Link, redirect, useActionData } from "react-router-dom"

// importing api functions
import axios from "axios"

// importing componenst
import { PageTitle } from "../components/PageTitle"


export const RegisterPage = () => {

    // getting actionData
    const actionData = useActionData()

    return (
        <Form method="POST" action="/register" className="form">
            
            <PageTitle title="Sign up"/>

            <h2 className="titleOfForm">Register form</h2>

            <input type="text" className="inputField" placeholder="Login" name="login"/>

            <input type="password" className="inputField" placeholder="Password" name="password"/>

            <input type="password" className="inputField" placeholder="Confirm password" name="confirmPassword"/>

            <p className="informationTag"> 
                Have got account already ?  

                <Link to="/login" className="linkTo">
                    Click here
                </Link>

            </p>

            { actionData && 
              actionData.error && 
              <p className="errorMessage"> {actionData.error} </p>
            }

            <button className="btn-green mx-auto">Sign up</button>

        </Form>
    )
}

export const registerAction = async ( { request } ) => {
    // getting form data
    const formData = await request.formData()

    // getting fields
    const login = formData.get("login")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

    // validating fields
    if ( !login.length || !password.length || !confirmPassword.length ) { return { error : "All fields must be provided "} }
    if ( password != confirmPassword ) { return { error : "Password and confirm password must be the same"} }

    //  checking data in database
    const users = await axios.get("http://localhost:3000/users/").then( (data) => { return data.data } )
    const user = users.filter((e) => (e.login == login))

    if ( user.length ) { return { error : "This login is taken already" } }

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
    } catch { return { error : "Something went wrong during creating account "} } 

    const newCurrentUser = {
        id : newUser.id,
        isLogged : true
    }

    try {
        await axios.put("http://localhost:3000/currentUser/", newCurrentUser)
    } catch { return { error : "Something went wrong during sign in process" } }

    return redirect("/account/")
}