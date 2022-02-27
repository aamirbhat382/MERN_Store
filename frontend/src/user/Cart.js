import { useContext, useEffect, useState } from "react";
import Base from "../core/Base";
import { CartContext } from '../CartContext';

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

    fetch('/api/products/cart-items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ids: Object.keys(cart.items)})
    }).then(res => res.json())
    .then(products => {
        setProducts(products);
        togglePriceFetched(true);
    })
}, [cart, priceFetched]);
  return (
    <Base>
      <div className="container">
        <ol className="list-group list-group-numbered">
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Content for list item
            </div>
            <span className="badge bg-primary rounded-pill">14</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Content for list item
            </div>
            <span className="badge bg-primary rounded-pill">14</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Content for list item
            </div>
            <span className="badge bg-primary rounded-pill">14</span>
          </li>
        </ol>
      </div>
    </Base>
  );
}

export default Cart;
