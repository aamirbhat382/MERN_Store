import React , {useState} from "react";
import Base from "../core/Base"
import { Link } from "react-router-dom";
import { signUpMethod} from "../auth/helper/index"
 
 const Signup = ()=> {

  // useState({})
  const [values, setValues ] = useState({
    name:"",
    lastname:"",
    email:"",
    password:"",
    error:"",
    success: false
  })

  const {name,lastname,email,password,error,success}= values
   
  // HANDLE Change in Input fields
  const handleChange = name => event=>{
  setValues({...values, error:false, [name]: event.target.value});
 }


 // Handle Click event(Submit)
 const onSubmit = event =>{
  event.preventDefault()
  setValues({...values,error:false})
  signUpMethod({name,lastname,email,password})
    .then(data=>{
        if(data.error){
           setValues({...values, error:data.error, success:false})
        }else{
          setValues({...values,name:"",lastname:"",email:"",password:"", error:"", success:true})
        }
    })
    .catch(err=>console.log(err))
}
  

  const signUpForm = ()=>{
    return (
      <div className="form-container bg-dark rounded">
           <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" value={name} className="form-control" id="name" onChange={handleChange("name")} aria-describedby="emailHelp"/>
                
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Last Name</label>
                <input type="text" value={lastname} className="form-control" id="name" onChange={handleChange("lastname")} aria-describedby="emailHelp"/>
                
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" value={email} className="form-control" onChange={handleChange("email")} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" value={password} className="form-control" onChange={handleChange("password")} id="exampleInputPassword1"/>
              </div>
              
              <button onClick={onSubmit} className="btn btn-primary ">Submit</button>
           </form>
        </div>
      )
  };

   const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign Up" discription="Create An Account">
    {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    {successMessage()}
    {errorMessage()}
      {signUpForm()}
      
    </Base>
 )
}
export default Signup