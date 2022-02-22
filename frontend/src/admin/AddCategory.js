import React , {useState} from "react";
import {AddCategoryMethod} from './helper/adminapicall'
import { isAutheticated } from "../auth/helper/index"

 


const AddCategory = () => {
const {user, token} = isAutheticated()

	const [values, setValues ] = useState({
    name:"",
    error:"",
    success: false,
    loading:false,
  });

const {name,error,success,loading,}= values
const handleChange = name => event=>{
  setValues({...values, error:false, [name]: event.target.value});
 };

const onSubmit = event =>{
  event.preventDefault()
  setValues({...values,error:false, loading:true})
  AddCategoryMethod(user._id,token,{name})
    .then(data=>{
        if(data.error){
           setValues({...values, error:data.error, loading:false})
        }else{
         setValues({...values,name:"", error:"", success:true})
        }
    })
    .catch(err=>console.log(err))
};

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Category Added SusssFully
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
  const CategoryForm = ()=>{
  	return (
  		<div className="form-container bg-dark rounded">
             <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-light">Enter Category Name</label>
                  <input type="text" value={name} onChange={handleChange("name")} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <button  onClick={onSubmit}  className="btn btn-primary ">Submit</button>
             </form>
          </div>
  		)
  }
return(
	<>
    {successMessage()}
    {errorMessage()}
    {CategoryForm()}
    </>
          )
}

export default AddCategory
