import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import 'tailwindcss/dist/tailwind.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducers from './reducers/index.js';


// Retrieve user data from local storage
const userData = JSON.parse(localStorage.getItem('userData'));

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  user: {
    userInfo: userData || null, // Set user info from local storage
    // Add other user-related state fields as needed
  },
};


const store = createStore(reducers, initialState, compose(applyMiddleware(thunk)));



ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
