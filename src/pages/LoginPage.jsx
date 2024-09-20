
// importing functions and components from react library
import { Form, Link, redirect, useActionData } from "react-router-dom"

// importing api functions
import axios from "axios"

// importing components
import { PageTitle } from "../components/PageTitle"


export const LoginPage = () => {

    // getting action data
    const actionData = useActionData()


    return (
        <Form method="POST" action="/login" className="form">
            <PageTitle title="Sign in" />

            <h2 className="titleOfForm">Login form</h2>

            <input type="text" className="inputField" placeholder="Login" name="login"/>
            <hr className="line" />

            <input type="password" className="inputField" placeholder="Password" name="password"/>
            <hr className="line" />

            <p className="informationTag"> 
                Haven't got account yet ?  

                <Link to="/register" className="linkTo">
                    Click here
                </Link>

            </p>

            { actionData && 
              actionData.error && 
              <p className="errorMessage"> {actionData.error} </p>
            }

            <button className="btn-green mx-auto">Sign in</button>

        </Form>
    )
}

export const loginAction = async ( {request} ) => {
    // getting data from form
    const formData = await request.formData()

    // getting fields
    const login = formData.get("login")
    const password = formData.get("password")

    // validating fields
    if ( !login.length || !password.length ) { return { error : "All fields must be provided "} }
    
    //  checking data in database
    const users = await axios.get("http://localhost:3000/users/").then( (data) => { return data.data})
    const user = users.filter((e) => (e.login == login) && (e.password == password))

    if ( !user.length ) { return { error : "Login or password is invalid" } }

    let currentUser = {
        id : user[0].id,
        isLogged : true
    }

    try {
        await axios.put("http://localhost:3000/currentUser/" , currentUser)
    } catch { return { error : "Something went wrong " } }

    return redirect("/account/")
}