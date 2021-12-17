import './NavigationBar.scss';
import { Link, navigate } from "@reach/router"

function NavigationBar(props) {

    function logout(e) {
        props.setcurrentUser(null)
        localStorage.removeItem('CurrentUser');
        navigate("/")
    }

    return (
        <nav className="nav">
            <div className="nav-wrap">
                <Link className="nav-logo" to="/">Wizzify-r</Link>
                <div className="nav_content">
                    <Link className="nav_content-button" to="makeWish"><p>Make A Wish!</p></Link>
                    <div>
                        {props.currentUser ?
                        <div onClick={(e) => logout(e)} className="nav_content-button" to="login"><p>Log out</p></div>
                        :
                        <>
                        <Link className="nav_content-button" to="login"><p>Login</p></Link>
                        <Link className="nav_content-button" to="register"><p>Register</p></Link>
                        </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}


export default NavigationBar;