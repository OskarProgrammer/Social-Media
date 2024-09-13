
// importing functions and components from react library
import { Form, Link } from "react-router-dom"


export const LoginPage = () => {


    return (
        <Form method="POST" className="form">

            <h2 className="titleOfForm">Login form</h2>

            <input type="text" className="inputField" placeholder="Login" name="login"/>

            <input type="password" className="inputField" placeholder="Password" name="password"/>

            <p className="informationTag"> 
                Haven't got account yet ?  

                <Link to="/register" className="linkTo">
                    Click here
                </Link>

            </p>

            <button className="btn-green mx-auto">Sign in</button>

        </Form>
    )
}