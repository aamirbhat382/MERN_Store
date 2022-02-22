import React from 'react'
import {  Outlet, Link,useLocation,NavLink} from "react-router-dom";
import Base from '../core/Base'
import {isAutheticated} from "../auth/helper/index"


const AdminDashBoard = ()=>{
const {name,lastname,email,} = isAutheticated().user
let location = useLocation();


	return(
		<>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
	  <div className="container-fluid">
	    <a className="navbar-brand" href="#">T-store</a>
	    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	      <span className="navbar-toggler-icon"/>
	    </button>
	    
	  </div>
</nav>
<div className="container-fluid">
  <div className="row">
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-background sidebar collapse">
      <div className=" pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link text-light fw-bold"   to="/admin/dashboard/home" >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-light fw-bold"   to="/admin/dashboard/home" >
              Orders
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-light fw-bold"   to="/admin/dashboard/home" >
              Products
            </NavLink>
          </li>
          
         
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Add</span>
          <a className="link-secondary" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <Link className="nav-link text-light fw-bold" to="create/product">
             Add Product
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light fw-bold" to="create/category">
             Add Category
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light fw-bold" to="create/product">
             Add User
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>

    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-light text-dark">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2 text-capitalize">{location.pathname.split('/').pop(-1)}</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            This week
          </button>
        </div>
      </div>

      <Outlet>
        <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            This week
          </button>
      </Outlet> 

    </main>
  </div>
</div>
</>
	)
}
export default AdminDashBoard