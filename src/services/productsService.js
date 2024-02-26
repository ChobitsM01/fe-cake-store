import axios from '../config/axios.customize';

const fetchProducts = async ( page, limit ) => {
  return await axios.get( `api/v1/product/read?page=${ page }&limit=${ limit }` );
}

const filterProduct = async ( name ) => {
  return await axios.get( `api/v1/product/search?name=${ name }` );
}

const fetchProductsByCategory = async ( id ) => {
  return await axios.get( `api/v1/productbycategory/${ id }` );
}

const deleteAproduct = async ( id ) => {
  return axios.delete( 'api/v1/product/delete', { data: { id: id } } );
}

const createNewproduct = ( formData ) => {
  return axios.post( 'api/v1/product/create', formData );
}

const updateCurrentProduct = ( formData ) => {
  return axios.put( 'api/v1/product/update', formData );
}

const fetchNewProduct = async () => {
  return await axios.get( 'api/v1/products/new' );
}

const fetchAProduct = async ( id ) => {
  return await axios.get( `api/v1/product/find/${ id }` );
}
export { fetchProducts, deleteAproduct, createNewproduct, updateCurrentProduct, fetchNewProduct, fetchAProduct, fetchProductsByCategory, filterProduct }