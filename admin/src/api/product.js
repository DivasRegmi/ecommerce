import axios from 'axios';

const getAllProducts = () => {
  return axios.get('/api/product/');
};

const postProduct = (product) => {
  return axios.post('/api/product/', product);
};

const editProduct = (product) => {
  return axios.put('/api/product/', product);
};

const deleteProduct = (product) => {
  return axios.delete(`/api/product/${product.id}`);
};

export { getAllProducts, postProduct, editProduct, deleteProduct };
