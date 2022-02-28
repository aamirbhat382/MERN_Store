import { useContext, useEffect, useState } from "react";
import Base from "../core/Base";
import { CartContext } from "../CartContext";
import { API } from "../backend";

function Cart() {
  let total = 0;
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  const [priceFetched, togglePriceFetched] = useState(false);
  useEffect(() => {
    if (!cart.items) {
      return;
    }

    if (priceFetched) {
      return;
    }

    fetch(`${API}products/cart-items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: Object.keys(cart.items) }),
    })
      .then((res) => res.json())
      .then((products) => {
        setProducts(products);
        togglePriceFetched(true);
      });
  }, [cart, priceFetched]);

  const getQty = (productId) => {
    return cart.items[productId];
}

const increment = (productId) => {
    const existingQty = cart.items[productId];
    const _cart = {...cart};
    _cart.items[productId] = existingQty + 1;
    _cart.totalItems += 1;
    setCart(_cart);
}

const decrement = (productId) => {
    const existingQty = cart.items[productId];
   if (existingQty === 1) {
        return;
   }
    const _cart = {...cart};
    _cart.items[productId] = existingQty - 1;
    _cart.totalItems -= 1;
    setCart(_cart);
}

const getSum = (productId, price) => {
    const sum = price * getQty(productId);
    total += sum;
    return sum;
}

const handleDelete = (productId) => {
    const _cart = {...cart};
    const qty = _cart.items[productId];
    delete _cart.items[productId];
    _cart.totalItems -= qty;
    setCart(_cart);
    const updatedProductsList = products.filter((product) => product._id !== productId);
    setProducts(updatedProductsList);
}

const handleOrderNow = () => {
    window.alert('Order placed succesfully!');
    setProducts([]);
    setCart({});
}
  
  
  return (
    <Base>
      <div className="container py-3">
        <ol className="list-group list-group-numbered">
          {products &&
            products.map((product) => {
              return (
                <li
                  key={product._id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{product.name}</div>
                    {product.price}
                  </div>
                  <div className="qty-price me-auto">
                  <div className="fw-bold">{ getQty(product._id) }</div>
                  ₹ { getSum(product._id, product.price) }
                  </div>
                  <div className="btn-group">
                  <button onClick={() => { decrement(product._id) }} className="btn btn-dark btn-sm">-</button>
                  <button  onClick={() => { increment(product._id) }}  className="btn btn-dark btn-sm">+</button>
                  </div>
                </li>
              );
            })}
        </ol>
      </div>
    </Base>
  );
}

export default Cart;
