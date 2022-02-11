import http from "./httpConfig"

//用户列表
export async function getUserList(params){
    let res =  await http.get(`userList?page=${params.page}&limit=${params.limit}`)
    return res
 }
 //用户查询
 export async function getUserSearch(params){
    let res =  await http.get(`userSearch?search=${params.search}&page=${params.page}&limit=${params.limit}`)
    return res
 }
//用户编辑
 export async function userEdit(params){
   console.log(params)
   let res =  await http.post(`userEdit`, params)
   return res
}
//用户删除
export async function userDelete(params){
   console.log(params)
   let res =  await http.post(`userEdit`, params)
   return res
}


//管理员列表
export async function getRootList(params){
   let res =  await http.get(`rootList?page=${params.page}&limit=${params.limit}`)
   return res
}

//管理员查询
export async function getRootSearch(params){
   let res =  await http.get(`rootList?search=${params.search}&page=${params.page}&limit=${params.limit}`)
   return res
}

//管理员创建
export async function addRootUser(params){
   let res =  await http.post(`rootAdd`, params)
   return res
}

//管理员删除
export async function rootDelete(params){
   console.log(params)
   let res =  await http.post(`rootDelete`, params)
   return res
}

//管理员删除
export async function rootEdit(params){
   console.log(params)
   let res =  await http.post(`rootEdit`, params)
   return res
}
