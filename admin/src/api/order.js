import axios from 'axios';

const getAllOrders = () => {
  return axios.get('/api/orders/');
};

const editOrders = (orders) => {
  return axios.put('/api/orders/', orders);
};

const deleteOrders = (orders) => {
  return axios.delete(`/api/orders/${orders.id}`);
};

export { getAllOrders, editOrders, deleteOrders };
