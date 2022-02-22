import {API} from '../../backend.js'


export const AddCategoryMethod = (userId,token,data)=>{
	return fetch(`${API}category/create/${userId}`,{
		method : "POST",
		headers:{
			Accepts:"application/json",
			"Content-Type":"application/json",
			Authorization: `Bearer ${token}`
		},
		body:JSON.stringify(data)
	})
	.then(response=>response.json())
	.catch(err=>console.log(err))
}