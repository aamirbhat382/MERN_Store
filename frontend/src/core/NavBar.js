import React from "react";
import {Link,useLocation,useNavigate} from "react-router-dom"
import {signOut,isAutheticated} from '../auth/helper/index'

const currentTab = (history, path)=>{
	if(history.pathname === path){
		return {color:'#9cf56f'}
	}else{
		return {color:'#FFFF'}
	}
}

function NavBar() {
	const history = useLocation();
	let navigate = useNavigate();
   return( 
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand  "  to="/">T-Store</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"/>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
	    		<li className="nav-item">
	    			<Link style={currentTab(history, "/")} className="nav-link fw-bolder" to="/cart">Home</Link>
	    		</li>
	    		<li className="nav-item">
	    			<Link style={currentTab(history, "/cart")} className="nav-link fw-bolder" to="/cart">Cart</Link>
	    		</li>
	    		{isAutheticated() && isAutheticated().user.role === 0 &&(
	    			<li className="nav-item">
	    			<Link style={currentTab(history, "/user/dashboard")} className="nav-link fw-bolder" to="/user/dashboard">Dashboard</Link>
	    			</li>
	    		)}
	    		{isAutheticated() && isAutheticated().user.role === 1 &&(
	    			<li className="nav-item">
	    			<Link style={currentTab(history, "/admin/dashboard")} className="nav-link fw-bolder" to="/admin/dashboard">A Dashboard</Link>
	    			</li>
	    		)}
	    		
	    		{isAutheticated() && 
				<>
		    		 <li className="nav-item">
		    			 <span style={currentTab(history, "/signout")} className="nav-link fw-bolder" 
		    				onClick={()=>{
		    				signOut(()=>{
		    					navigate("/", { replace: true });
		    				})
		    			}}>
		    	 			Signout
		    			</span>
		    		   </li>
	    			</>
				}
	    		
	    			
	    			{!isAutheticated() &&
	    			<>
		    			<li className="nav-item">
			    			<Link style={currentTab(history, "/signup")} className="nav-link fw-bolder" to="/signup ">Signup</Link>
			    		</li>
			    		<li className="nav-item">
			    			<Link style={currentTab(history, "/signin")} className="nav-link fw-bolder " to="/signin">Signin</Link>
			    		</li>
		    		</>
	    		}
	    	</ul>
      
      
    </div>
  </div>
</nav>
	    )
   
}
export default NavBar

