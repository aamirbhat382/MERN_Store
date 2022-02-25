import React, { useState, useEffect } from "react";
import {getCategories, createaProduct} from './helper/adminapicall'
import { isAutheticated } from "../auth/helper/index"

 


const AddProduct = () => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    success:false,
    formData: ""
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    success,
    formData
  } = values;

  const preload = () => {
    getCategories().then(data => {
      // console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createaProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,success:true,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name
        });
      }
    });
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };


  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Product Added SusssFully
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
                  <label htmlFor="discription" className="form-label text-light"> Description</label>
                  <input type="text" value={description} onChange={handleChange("description")} className="form-control"  aria-describedby="discriptionHelp"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label text-light"> Price</label>
                  <input type="text" value={price} onChange={handleChange("price")} className="form-control"  aria-describedby="priceHelp"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="stock" className="form-label text-light"> Stock</label>
                  <input type="text" value={stock} onChange={handleChange("stock")} className="form-control" aria-describedby="stockHelp"/>
                </div>
                <div className="mb-3">
                   <label htmlFor="category" className="form-label text-light">Category</label>
                  <select onChange={handleChange("category")} className="form-control" placeholder="Category">
                    <option>Select</option>
                      {categories &&
                        categories.map((cate, index) => (
                        <option key={index} value={cate._id}> {cate.name}</option>
                        ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="photo" className="form-label text-light">Choose Photo</label>
                  <input type="file"  name="photo" accept="image" onChange={handleChange("photo")} className="form-control"  aria-describedby="photoHelp"/>
                </div>
                <button  onClick={onSubmit}  className="btn btn-primary ">Submit</button>
             </form>
          </div>
  		)
  }
return(
	<>
    {errorMessage()}
    {successMessage()}
    {ProductForm()}
    </>
          )
}

export default AddProduct
