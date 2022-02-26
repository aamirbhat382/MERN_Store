import React from "react";
import "../styles.css";
import Base from "./Base";
import { useEffect, useState } from "react";
import { getProducts } from "../admin/helper/adminapicall";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const preload = () => {
    getProducts().then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const ImageHelper = (productId) => {
    return (
      <div
        className="bg-img"
        style={{
          backgroundImage: "url('https://picsum.photos/200/300')",
        }}
      />
    );
  };



const HandleAddtoCart = (item)=>{
  let cartItem = [item]
  if (localStorage.getItem('Cart') == null) {
    let Cart = {}
 
} else {
    Cart = JSON.parse(localStorage.getItem('Cart'));
    Cart.push(cartItem)
}
}

  return (
    <Base>
      <div className="container">
        <div className="row py-1">
          {products &&
            products.map((product) => {
              return (
                <div className="col-md-3 mb-2" key={product._id}> 
                  <div className="card bg-dark rounded">
                    <div
                      className="bg-img"
                      style={{
                        backgroundImage: "url('https://picsum.photos/200/300')",
                      }}
                    />
                    <div className="card-body">
                      <h1>{product.price}</h1>
                      <h6 className="card-title">{product.name}</h6>
                      <p className="card-text">{product.description}</p>
                      <Link   onClick={(()=>{HandleAddtoCart(product.description)})} className="btn btn-primary">
                        Add To Cart
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Base>
  );
};
export default Home;
