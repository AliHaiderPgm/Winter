const getTokenFromCookie = (cookie, tokenName) => {
    return cookie?.split(" ").filter(token => {
        if (token.startsWith(tokenName)) {
            return token
        }
    })[0].split("=")[1].replace(/;$/, '')
}


module.exports = {
    getTokenFromCookie
}