const API_URL = process.env.REACT_APP_API;

export async function getWishes() {
    const url = `${API_URL}/wishes`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function getWish(id) {
    const url = `${API_URL}/wishes/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function submitWish(e, mode, id) {
    const form = new FormData(e.target);
    const wish = {
        name: form.get("name"),
        details: form.get("details"),
        img: form.get("imgstring"),
        links: form.getAll("link").filter(q => q),
        date: new Date(),
        comments: []
    }

    const url = `${API_URL}/wishes/${mode}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({wish:wish, id:id})
    })
    return response.json();
}

export async function commentHandle(e, id, author) {
    const form = new FormData(e.target);

    if (form.get("comment") === "") {
        return {error: "Comment field is empty"}
    }

    const comment = {
        author: author,
        comment: form.get("comment"),
        date: new Date()
    }

    const url = `${API_URL}/wishes/makecomment`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, comment: comment})
    })
    return response.json();
}

export async function likeHandle(id) {
    const url = `${API_URL}/wishes/like/${id}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    return response.json();
}

export async function receivedHandle(id) {
    const url = `${API_URL}/wishes/received/${id}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    return response.json();
}

export async function deleteHandle(id) {
    const url = `${API_URL}/wishes/delete/${id}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    return response.json();
}
