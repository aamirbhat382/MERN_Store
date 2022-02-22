import React from "react";
import "../styles.css";
import Base from "./Base"

 const Home = ()=> (
  <Base>
      <div className="container">
          <div className="row py-1">
              <div className="col-md-3 mb-2">
                  <div className="card bg-dark rounded" >
                      <div className="bg-img" style={{"backgroundImage": "url('https://picsum.photos/200/300')"}}/>
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                      </div>
                </div>
              </div>
              <div className="col-md-3 mb-2">
                  <div className="card bg-dark rounded" >
                      <div className="bg-img" style={{"backgroundImage": "url('https://picsum.photos/200/300')"}}/>
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                      </div>
                </div>
              </div>
              <div className="col-md-3 mb-2">
                  <div className="card bg-dark rounded" >
                      <div className="bg-img" style={{"backgroundImage": "url('https://picsum.photos/200/300')"}}/>
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                      </div>
                </div>
              </div>
              <div className="col-md-3 mb-2">
                  <div className="card bg-dark rounded" >
                      <div className="bg-img" style={{"backgroundImage": "url('https://picsum.photos/200/300')"}}/>
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                      </div>
                </div>
              </div>
              <div className="col-md-3 mb-2">
                  <div className="card bg-dark rounded" >
                      <div className="bg-img" style={{"backgroundImage": "url('https://picsum.photos/200/300')"}}/>
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                      </div>
                </div>
              </div>
              <div className="col-md-3 mb-2">
                  <div className="card bg-dark rounded" >
                      <div className="bg-img" style={{"backgroundImage": "url('https://picsum.photos/200/300')"}}/>
                      <div className="card-body">
                        <h5 className="card-title">Rs 499</h5>
                        <h6 className="card-title text-success">I Phone 12 pro max</h6>
                        <small className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</small>

                        <button  className="btn btn-primary">Add to Cart</button>
                      </div>
                </div>
              </div>
        </div>
    </div>
 </Base>
)
export default Home