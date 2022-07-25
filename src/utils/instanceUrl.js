import axios from "axios";

export const initialInstance= axios.create({
    baseURL:'https://app4125.herokuapp.com/',
})

export const adminInstance= axios.create({
    baseURL:'https://app4125.herokuapp.com/',
    headers:{
        "email":"marwan@gmail.com",
        "password":"marwan"
    }
})
