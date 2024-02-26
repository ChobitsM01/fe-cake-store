import axios from '../config/axios.customize';

const fetchOrders = async ( page, limit ) => {
  return await axios.get( `api/v1/order/read?page=${ page }&limit=${ limit }` );
}

const createOrder = ( data ) => {
  return axios.post( 'api/v1/order/create', data );
}

const updateAnOrder = ( orderData ) => {
  return axios.put( 'api/v1/order/update', { orderData } );
}

const destroyAnOrder = async ( id ) => {
  return axios.delete( 'api/v1/order/delete', { data: { id: id } } );
}

export { createOrder, fetchOrders, updateAnOrder, destroyAnOrder }