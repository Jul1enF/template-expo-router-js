

const userAuthHeader = (token) => {
    return {
        'Authorization': `Bearer ${token}`
    }
}


module.exports = { userAuthHeader }