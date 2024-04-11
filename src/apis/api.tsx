const root = process.env.REACT_APP_BACKEND_ROOT_URL as string;

async function NiceDelay() {
    await new Promise(r => setTimeout(r, Math.random() * 3000));
}

async function getFetch(url: string) {
    // await NiceDelay();
    const res = await fetch(url)
    if (!res.ok) {
        console.log(res);
        const message = await res.text();
        console.log(message);
        throw new Error(message);
    }

    return res.json();
}

async function postFetch(url: string, body: any) {
    await NiceDelay();
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

async function putFetch(url: string, body: any) {
    await NiceDelay();
    return postFetch(url, body);
}

async function mutationOnSuccessReload(res: Response) {
    if (!res.ok) {
        console.log(res);
        const message = await res.text();
        console.log(message);
        throw new Error(message);
    }

    res.text()
        .then(data => {
            console.log(data)
            window.location.reload();
        })
}

function mutationOnError(error: Error) {
    console.log(error.message);
}

export { getFetch, mutationOnError, mutationOnSuccessReload, postFetch, putFetch, root };
