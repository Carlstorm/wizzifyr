import { navigate } from "@reach/router"
const API_URL = process.env.REACT_APP_API;

export function loginCheck(redirect, level) {
    if (localStorage.getItem("CurrentUser") === null) {
        localStorage.setItem('redirect', redirect);
        return navigate("/login")
    } else if (level) {
        const userobj = JSON.parse(localStorage.getItem("CurrentUser"))
        if (!userobj.chosenone) {
            return navigate("/error", {state: {type: "denied"}}) 
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export async function getUsers() {
    const url = `${API_URL}/users`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function loginHandle(e) {
    const form = new FormData(e.target);
    const url = `${API_URL}/users/authenticate`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: form.get("username"), password: form.get("password")})
    })

    const data = await response.json();
    return data;
}

export async function registerHandle(e) {
    const form = new FormData(e.target);

    const User = {
        username: form.get("username"),
        password: form.get("password")
    }

    const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(User)
    })
    return response.json();
}
