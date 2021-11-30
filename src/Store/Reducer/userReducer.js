
const INITIAL_STATE = {
    userObj: {
        email:"",
        id:"",
        password:"",
        point:0,
        userType:"",
        username:""
    }
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "JWT_SET":
            return {
                userObj: {
                    ...state.userObj,
                    jwt: action.payload
                }
            }
        case "USER_INFO_SET":
            console.log("Action::::",action.payload.username);
            return {
                userObj:{...action.payload}
            }
        default:
            return state;
    }
}
