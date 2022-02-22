import {API} from '../../backend.js'



export const signUpMethod = user=>{
	return fetch(`${API}signup`,{
		method : "POST",
		headers:{
			Accepts:"application/json",
			"Content-Type":"application/json"
		},
		body:JSON.stringify(user)
	})
	.then(response=>response.json())
	.catch(err=>console.log(err))
}

export const signInMethod = user=>{
	return fetch(`${API}signin`,{
		method : "POST",
		headers:{
			Accepts:"application/json",
			"Content-Type":"application/json"
		},
		body:JSON.stringify(user)
	})
	.then(response=> {
		return response.json()
	})
	.catch(err=>console.log(err))
}

export const authenticate = (data,next)=>{
	if(typeof window !== "undefined"){
		localStorage.setItem("jwt", JSON.stringify(data))
		next()
	}
}

export const signOut = next=>{
	if(typeof window !== "undefined"){
		localStorage.removeItem("jwt")
		next()
		return fetch(`${API}/signout`,{
			method:"GET"
		})
		.then(response=>console.log("signout Success"))
		.catch(err=>console.log(err))
	}
}



export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
}