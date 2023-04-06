
function sendNewPassw(passw: string, userKey: string) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_RESET_PASSW

    return fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'id': userKey,
            'pass': passw
        })
    })
}

export { sendNewPassw };

