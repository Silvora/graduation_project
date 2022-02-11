import http from "./httpConfig"

export async function login(params){
   let res =  await http.post('login', params)
   return res
}