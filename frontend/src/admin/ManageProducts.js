import React, { useState, useEffect } from "react";
import {getProducts,deleteProduct} from './helper/adminapicall'
import { isAutheticated } from "../auth/helper/index"
import {Link,Outlet,NavLink} from 'react-router-dom'


const ManageProducts = () => {
const [products, setProducts] = useState([])
const {user, token} = isAutheticated()

const preload = () => {
    getProducts().then(data => {
      // console.log(data);
      if (data.error) {
        console.log(data.error)
      } else {
        setProducts(data);
      }
    });
 };

useEffect(() => {
    preload();
  }, []);

const DeleteThisProduct = (productId)=>{
	deleteProduct(productId,user._id,token).then(data => {
      // console.log(data);
      if (data.error) {
        console.log(data.error)
      } else {
        preload()
      }
    });
}

return(
	<>
	<Outlet/>
	<div className="list-group py-3">
		{ products.map((product,index)=>{
			return(
			<div key={index}  className="list-group-item list-group-item-action" aria-current="true">
		    <div className="d-flex w-100 justify-content-between">
		      <h5 className="mb-1">{product.name}</h5>
		      <small>{product.stock}</small>
		    </div> 
		    <Link to={`update/${product._id}`} replace className="btn btn-warning mx-1 btn-sm">Update</Link>
		    <button type="button" className="btn btn-danger mx-1 btn-sm" onClick = {()=>{
		    	DeleteThisProduct(product._id)
		    }}>Delete</button>
			
		</div> )
		})
	}
		

	</div>
	</>
		)

}

export default ManageProducts