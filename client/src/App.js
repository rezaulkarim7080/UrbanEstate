import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header.js';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Footer from './components/Footer';
import Loader from './loader/Loader';
import SinglePageDetails from './pages/SinglePageDetails';
import AllProducts from './pages/AllProducts';
import Account from './pages/Account';
import AddService from './pages/AddService';
import MyReviews from './pages/MyReviews';


function App() {

  return (

    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/account' element={<Account />} />
          <Route path='/addservice' element={<AddService />} />
          <Route path='/myreviews' element={<MyReviews />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />


          <Route path='/products/:id' element={<SinglePageDetails />} />
          <Route path='/products/products/:id' element={<SinglePageDetails />} />

          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:keyword' element={<AllProducts />} />


        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>

  );
}

export default App;
