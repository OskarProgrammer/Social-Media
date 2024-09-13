
// importing funcitons and components from react library
import { Form, Link } from "react-router-dom"

export const RegisterPage = () => {

    return (
        <Form className="form">

            <h2 className="titleOfForm">Register form</h2>

            <input type="text" className="inputField" placeholder="Login"/>

            <input type="password" className="inputField" placeholder="Password"/>

            <input type="password" className="inputField" placeholder="Confirm password"/>

            <p className="informationTag"> 
                Have got account already ?  

                <Link to="/login" className="linkTo">
                    Click here
                </Link>

            </p>

            <button className="btn-green mx-auto">Sign up</button>

        </Form>
    )
}