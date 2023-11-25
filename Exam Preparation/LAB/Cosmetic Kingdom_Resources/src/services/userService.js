const userService = {
    getUserData: () => {
        return JSON.parse(localStorage.getItem('userData'));
    },
    setUserData: (userData) => {
        localStorage.setItem('userData', JSON.stringify(userData));
    },
    removeUserData: () => {
        localStorage.removeItem('userData');
    }
};
export { userService };