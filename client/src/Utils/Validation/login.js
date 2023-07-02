export const loginValidation = (data) => {
    const error = {}
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/
    const passwordRegex = /^(?=.*[A-Z]).(?=.*\d).(?=.*[#$^+=!*()@%&]).{1,10}$/

    if(!emailRegex.test(data.email)){
        error.email = 'Invalid email'
    }
    if (!passwordRegex.test(data.password)) {
        error.password = 'Invalid password'
    }
    return error
}