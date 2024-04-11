function failedPromise(msg: string)  {
    return(Promise.reject(new Error(msg)));
}

export { failedPromise };
