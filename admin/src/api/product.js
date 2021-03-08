import axios from 'axios';

const getProductById = (id) => {
  return axios.get(`/api/product/${id}`);
};

const getAllProducts = () => {
  return axios.get('/api/product/');
};

const postProduct = (product) => {
  return axios.post('/api/product/', product, {
    headers: { 'content-type': 'multipart/form-data' },
  });
};

const editProduct = (product) => {
  return axios.put('/api/product/', product);
};

const deleteProduct = (product) => {
  return axios.delete(`/api/product/${product.id}`);
};

export {
  getProductById,
  getAllProducts,
  postProduct,
  editProduct,
  deleteProduct,
};
