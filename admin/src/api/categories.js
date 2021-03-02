import axios from 'axios';

const getAllCategorie = () => {
  return axios.get('/api/categorie/');
};
const getAllSubCategorie = () => {
  return axios.get('/api/categorie/subCategorie');
};

const postCategorie = (categorie) => {
  return axios.post('/api/categorie/', categorie);
};
const postSubCategorie = (SubCategorie) => {
  return axios.post('/api/categorie/subCategorie', SubCategorie);
};

const editCategorie = (categorie) => {
  return axios.put(`/api/${categorie.id}`, categorie);
};
const editSubCategorie = (subCategorie) => {
  return axios.put(`/api/categorie/${subCategorie.id}`, subCategorie);
};

const deleteCategorie = (categorie) => {
  return axios.delete(`/api/categorie/${categorie.id}`);
};
const deleteSubCategorie = (subCategorie) => {
  return axios.delete(`/api/categorie/${subCategorie.id}`);
};

export {
  getAllCategorie,
  getAllSubCategorie,
  postCategorie,
  postSubCategorie,
  editCategorie,
  editSubCategorie,
  deleteCategorie,
  deleteSubCategorie,
};
