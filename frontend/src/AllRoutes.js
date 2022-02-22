import React from "react";
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

const AllRoutes = () => {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home />}>
        </Route>
        <Route path='/signup' element={<Signup />}>
        </Route>
        <Route path="/signin"  element={<Signin />}>
        </Route>
         <Route path="/admin/dashboard" element={<AdminRoutes> <AdminDashBoard/> </AdminRoutes>}>
            <Route path="home"  element={< AddCategory/>}/>
            <Route path="create/category"  element={< AddCategory/>}/>
            <Route path="create/product"  element={< AddProduct/>}/>
        </Route>
          <Route path="/user/dashboard" element={
              <PrivateRoutes >
                <UserDashBoard/>
              </PrivateRoutes>
            }
          ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
