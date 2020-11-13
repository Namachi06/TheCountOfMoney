import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './styles/app.css';

// Pages import
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <a href="/">The Count of Money</a>
          </div>
        </header>
        <main className="main">
          <div className="content">
            <Route path="/" exact component={Home} />
            {/* EXAMPLE */}
            {/* <Route path="/category/:id" component={Home} />
            <Route path="/product/:id" component={Product} />
            <Route path="/products" component={Products} />
            <Route path="/register" component={Register} />
            <Route path="/signin" component={Signin} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/profile" component={Profile} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/payment" component={Payment} />
            <Route path="/placeorder" component={PlaceOrder} />
            <Route path="/order/:id" component={Order} />
            <Route path="/orders" component={Orders} /> */}
          </div>
        </main>
        <footer className="footer">
          All right reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
