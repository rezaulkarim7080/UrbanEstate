import axios from 'axios';

const url = 'http://localhost:5000/api/products';
const url2 = 'http://localhost:5000/api';

// create post part
// http://localhost:5000/api/products/new


export const fetchProduct = (keyword, currentPage) => axios.get(`${url}?keyword=${keyword}&page=${currentPage}`);
export const getProductdetails = (id) => axios.get(`${url}/${id}`);
export const createProducts = (productData) => axios.get(`${url}/new`, productData);

//////

export const UserLogin = ({ email, password }) => axios.post(`${url2}/login`, { email, password });
export const UserRegister = (userData) => axios.post(`${url2}/register`, userData);
export const UserUpdate = (userData) => axios.put(`${url2}/me/update`, userData);
export const UserLogOut = () => axios.get(`${url2}/logout`);
export const USERloader = () => axios.get(`${url2}/me`);

//////




