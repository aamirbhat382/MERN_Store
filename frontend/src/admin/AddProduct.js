import React , {useState} from "react";
import {AddCategoryMethod} from './helper/adminapicall'
import { isAutheticated } from "../auth/helper/index"

 


const AddProduct = () => {
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
  const ProductForm = ()=>{
  	return (
  		<div className="form-container bg-dark rounded">
             <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-light"> Product Name</label>
                  <input type="text" value={name} onChange={handleChange("name")} className="form-control"  aria-describedby="nameHelp"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="discription" className="form-label text-light"> Discription</label>
                  <input type="text" value={name} onChange={handleChange("name")} className="form-control"  aria-describedby="discriptionHelp"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label text-light"> Price</label>
                  <input type="text" value={name} onChange={handleChange("name")} className="form-control"  aria-describedby="priceHelp"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="stock" className="form-label text-light"> Stock</label>
                  <input type="text" value={name} onChange={handleChange("name")} className="form-control" aria-describedby="stockHelp"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="photo" className="form-label text-light">Choose Photo</label>
                  <input type="file" value={name} onChange={handleChange("name")} className="form-control"  aria-describedby="photoHelp"/>
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
    {ProductForm()}
    </>
          )
}

export default AddProduct
