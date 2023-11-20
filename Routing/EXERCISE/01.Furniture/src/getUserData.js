const userData = {
    getUserData : () => JSON.parse(localStorage.getItem('userData')),
    setUserData : (data) => localStorage.setItem('userData', JSON.stringify(data))
}
export { userData }