import React,  { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup"
import Signin from "./user/Signin"
import {isAutheticated} from './auth/helper/index'
import AdminRoutes from "./auth/helper/AdminRoutes"
import PrivateRoutes from "./auth/helper/PrivateRoutes"
import UserDashBoard from './user/UserDashBoard'
import AdminDashBoard from './user/AdminDashBoard'
import AddCategory from'./admin/AddCategory'
import AddProduct from'./admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import { CartContext } from './CartContext';
import { getCart, storeCart } from './helper';
import Cart from "./user/Cart";

const AllRoutes = () => {
  const [ cart, setCart ] = useState({});
  // Fetch cart from local storage
  useEffect(() => {
    getCart().then(cart => {
      setCart(JSON.parse(cart));
    });
  }, []);
  
  useEffect(() => {
      storeCart(JSON.stringify(cart));
  }, [cart]);

  return (
     <BrowserRouter>
     <CartContext.Provider value={{ cart, setCart }}>
      <Routes>
        <Route path="/"  element={<Home />}>
        </Route>
        <Route path="/cart"  element={<Cart/>}>
        </Route>
       
        <Route path='/signup' element={<Signup />}>
        </Route>
        <Route path="/signin"  element={<Signin />}>
        </Route>
         <Route path="/admin/dashboard" element={<AdminRoutes> <AdminDashBoard/> </AdminRoutes>}>
            <Route path="home"  element={< AddCategory/>}/>
            <Route path="create/category"  element={< AddCategory/>}/>
            <Route path="create/product"  element={< AddProduct/>}/>
            <Route path="products"  element={< ManageProducts/>}>
              <Route path="update/:productId"  element={<UpdateProduct/>}/>
            </Route>
            
        </Route>
          <Route path="/user/dashboard" element={
              <PrivateRoutes >
                <UserDashBoard/>
              </PrivateRoutes>
            }
          ></Route>
      </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
};

export default AllRoutes;
