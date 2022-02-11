import http from "./httpConfig"


//活动编辑
export async function activeEdit(params){
   let res =  await http.post('activeEdit', params)
   return res
}


//活动列表
export async function getActiveList(params){
   let res =  await http.get(`activeList?page=${params.page}&limit=${params.limit}`)
   return res
}

//活动查询
export async function getActiveSearch(params){
   let res =  await http.get(`activeSearch?search=${params.search}&page=${params.page}&limit=${params.limit}`)
   return res
}