import { useRouteError } from "react-router-dom"

export const ErrorPage = () => {

    const error = useRouteError()

    return (
        <div className="errorPage">
            <div className="container">
                <div>
                    Ops there was an error!
                </div>
                <div>
                    ERROR : {error.message}
                </div>
            </div>
        </div>
    )
}