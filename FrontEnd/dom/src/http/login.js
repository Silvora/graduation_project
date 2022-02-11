import http from "./httpConfig"


export async function register(params){
    console.log(params)
    const res = await http.post("/register", params)
    return res
}



export async function verifyEmail(params){
    console.log(params)
    const res = await http.post("/verifyEmail", params)
    return res
}