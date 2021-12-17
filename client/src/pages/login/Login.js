import { loginHandle } from "../../Modules/Users";
import { useState } from "react";
import { Link, navigate } from "@reach/router"
import './Login.scss';

function Login(props) {

    const [Errors, setErrors] = useState(null);

    function login(e) {
        e.preventDefault()
        loginHandle(e).then(function(response) {
            if (!response.error) {
                localStorage.setItem("CurrentUser", JSON.stringify(response.user))
                props.setcurrentUser(response.user);
                if (localStorage.getItem('redirect')) {
                    navigate(localStorage.getItem('redirect'))
                    localStorage.removeItem('redirect');
                } else {
                    navigate("/")
                }
            } else {
                setErrors(response.error)
            }
        })
    }

    return (
        <>
            <div className="login-container">
                <p className="login-heading">Log In</p>
                {Errors ? <p className="login-errorList">{Errors}</p> : null}
                <form className="login-form" onSubmit={(e) => login(e)}>
                    <p className="prop-heading">Username</p>
                    <input className="login-input" type="text" name="username"></input>
                    <p className="prop-heading">Password</p>
                    <input className="login-input" type="password" name="password"></input>
                    <div>
                        <input className="login-submit" type="submit" value="Login"></input>
                        <Link className="login-register" to={"/register"}>Register</Link>
                    </div>
                </form>
            </div>
        </>
    )
}


export default Login;