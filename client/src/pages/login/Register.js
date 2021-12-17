import { registerHandle } from "../../Modules/Users";
import { useState } from "react";
import { Link, navigate } from "@reach/router";

import './Login.scss';

function Register(props) {
    const [Errors, setErrors] = useState(null);

    function register(e) {
        e.preventDefault()
        const form = new FormData(e.target);
        if (form.get("password") !== form.get("Cpassword")) {
            setErrors(["passwords dosnt match"])
        } else {
            registerHandle(e).then(function(response) {
                if (!response.error) {
                    localStorage.setItem("CurrentUser", JSON.stringify(response))
                    props.setcurrentUser(response)
                    navigate("/")
                } else {
                    setErrors(response.error)
                }
            })
        }
    }

    return (
        <div className="login-container">
        <h2 className="login-heading">Sign Up</h2>
            {Errors ? <p className="login-errorList">{Errors}</p> : null}
            <form className="login-form" onSubmit={(e) => register(e)}>
                <p className="prop-heading">Username</p>
                <input className="login-input" type="text" name="username"></input>
                <p className="prop-heading">Password</p>
                <input className="login-input" type="password" name="password"></input>
                <p className="prop-heading">Confirm Password</p>
                <input className="login-input" type="password" name="Cpassword"></input>
                <div>
                    <input className="login-submit" type="submit" value="Register"></input>
                    <Link className="login-register" to={"/login"}>Login</Link>
                </div>
            </form>
        </div>
    )
}


export default Register;