import React from "react";
import NavBar from "./NavBar"


 const Base = ({title='title',discription='discription', className="text-white",children})=> (
      <div>
        <NavBar/>
        
        <div className={className}>{children}</div>
        {/* <footer className="py-3 mt-2 bg-dark text-center text-light fixed-bottom"> */}
        {/*   Copyright 2022  */}
        {/* </footer> */}
      </div>



 
)
export default Base