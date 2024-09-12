
// importing functions and components from react library
import { Form } from "react-router-dom"


export const LoginPage = () => {


    return (
        <Form className="form">

            <h2 className="titleOfForm">Login form</h2>

            <input type="text" className="inputField" placeholder="Login"/>

            <input type="password" className="inputField" placeholder="Password"/>

            <button className="btn-blue mx-auto">Sign in</button>

        </Form>
    )
}