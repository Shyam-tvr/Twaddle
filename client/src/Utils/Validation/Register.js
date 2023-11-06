export const userDetails = ({fullName,email,mobile}) => {
    let error = {}
    const nameRegex = /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/
    const phoneRegex = /^\d{10}$/
    //validation for First name
    if(fullName.length <= 4){
        error.fullName ='Name must be 4 letters'
    }else if(!nameRegex.test(fullName)){
        error.fullName ='Invalid Name'
    }
    //validation for email
    if (!emailRegex.test(email)) {
        error.email = 'Invalid email'
    }
    //validation for Phone number
    if (!phoneRegex.test(parseInt(mobile))) {
        error.mobile = 'Invalid Phone number'
    }
    return error
}

export const usernameValidation = (username) => {
    let error = {}
    const usernameRegex = /^[a-z0-9_-]{3,16}$/
    if (!usernameRegex.test(username)) {
        error.username ='Invalid username'
    }
    return error
}

export const passwordValidation = (data) => {
    let error={}
    if(data.length >= 8 ){
        error.case1 = true;
    }
    if((/^(?=.*[A-Z]).{1,10}$/).test(data) && (/(?=.*[a-z]).{1,10}$/).test(data)){
        error.case2 = true
    }
    if((/^(?=.*\d).{1,10}$/).test(data)){
        error.case3 = true
    }
    if((/^(?=.*[#$^+=!*()@%&]).{1,10}$/.test(data))){
        error.case4 = true
    }
    return error 
}