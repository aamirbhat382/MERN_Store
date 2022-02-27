import React from "react";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../CartContext";
import "../styles.css";
import Base from "./Base";
import { getProducts } from "../admin/helper/adminapicall";
import { addToCart } from "./helper/Cart";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);
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

  const addToCart = (event, product) => {
    event.preventDefault();
    let _cart = { ...cart }; // { items: {}}
    if (!_cart.items) {
      _cart.items = {};
    }
    if (_cart.items[product._id]) {
      _cart.items[product._id] += 1;
    } else {
      _cart.items[product._id] = 1;
    }

    if (!_cart.totalItems) {
      _cart.totalItems = 0;
    }
    _cart.totalItems += 1;
    setCart(_cart);
  };

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
                      <button
                        onClick={(e) => {
                          addToCart(e, product);
                        }}
                        className="btn btn-primary"
                      >
                        Add To Cart
                      </button>
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
