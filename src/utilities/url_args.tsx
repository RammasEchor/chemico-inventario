function addArgToUrl(url: string, argName: string, argValue: string): string {
    const last = url[url.length - 1];
    if (last === "/")
        url = url.slice(0, url.length - 1);

    let separator = "&"
    if (!(url.slice(url.lastIndexOf("/")).includes("?")))
        separator = "?"

    return `${url}${separator}${argName}=${argValue}`;
}

export { addArgToUrl };
