const userService = {
    getUserData : () => {return JSON.parse(localStorage.getItem('userData'))},
    setUserData : () => {localStorage.setItem('userData', JSON.stringify(userData))}
}

export { userService }