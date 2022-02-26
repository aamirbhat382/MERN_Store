import React , {useState} from "react";
import Base from "../core/Base"
import { Link, Navigate } from "react-router-dom";
import { signInMethod,authenticate,isAutheticated} from "../auth/helper/index"

const Signin = () => {
    const [values, setValues ] = useState({
    email:"",
    password:"",
    error:false,
    loading:false,
    didRedirect:false
  });

const {email,password,error,loading,didRedirect}= values
const {user} = isAutheticated();
const handleChange = name => event=>{
  setValues({...values, error:false, [name]: event.target.value});
 };

const onSubmit = event =>{
  event.preventDefault()
  setValues({...values,error:false, loading:true})
  signInMethod({email,password})
  
    .then(data=>{
      
        if(data.error){
           setValues({...values, error:data.error, loading:false})
        }else{
          authenticate(data, ()=>{
            setValues({
              ...values,
              didRedirect:true
            })
          })
        }
    })
    .catch(err=>console.log(err))
};

const performRedirect =()=>{
  if(didRedirect){
    if(user && user.role === 1){
      return   <Navigate to="/admin/dashboard" />  
    }else{
      return  <Navigate to="/user/dashboard" />
    }
  }
  if(isAutheticated()){
    return <Navigate to="/"  />
  }
}
  
const loadingMessage = () => {
    return (
      loading && (
        <div className="alert-info">
          <h2>loading</h2>
        </div>
        )
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
   const signInForm =()=>{
    return(
          <div className="form-container bg-dark rounded">
             <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" value={email} onChange={handleChange("email")} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" value={password} onChange={handleChange("password")} className="form-control" id="exampleInputPassword1"/>
                </div>
                
                <button  onClick={onSubmit} className="btn btn-primary ">Submit</button>
             </form>
          </div>
      )
   }
return(
    <Base title="Sign In" discription="Please Sign in your Accouny">
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
   </Base>
  );
};
export default Signin