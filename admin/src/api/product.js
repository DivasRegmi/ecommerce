import axios from 'axios';

const getAllProducts = () => {
  return axios.get('/api/product/');
};

const postProduct = (product) => {
  return axios.post('/api/product/', product);
};
