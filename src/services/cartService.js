import axios from '../config/axios.customize';

const fetchUserCarts = async ( id ) => {
  return await axios.get( `api/v1/cart/read?id=${ id }` );
}
const deleteProductInCart = async ( data ) => {
  console.log( 'check data: ', data );
  return axios.delete( 'api/v1/cart/delete', { data } );
}
const addProductToCart = ( data ) => {
  return axios.post( 'api/v1/cart/create', data );
}

export { fetchUserCarts, addProductToCart, deleteProductInCart }