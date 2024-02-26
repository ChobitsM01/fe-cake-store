import axios from '../config/axios.customize';

const registerNewUser = async ( email, name, phone, password, address ) => {
  return await axios.post( 'api/v1/register', {
    email, name, phone, password, address
  } )
}
const loginUser = async ( account, password ) => {
  return await axios.post( 'api/v1/login', {
    account, password
  } )
}
const fetchAllUsers = async ( page, limit ) => {
  return await axios.get( `api/v1/users/read?page=${ page }&limit=${ limit }` );
}
const deleteAUser = async ( id ) => {
  return axios.delete( 'api/v1/user/delete', { data: { id: id } } );
}
const fetchGroup = async () => {
  return axios.get( 'api/v1/group/read' );
}

const createNewUser = ( userData ) => {
  return axios.post( 'api/v1/user/create', { ...userData } );
}

const updateCurrentUser = ( userData ) => {
  return axios.put( 'api/v1/user/update', { ...userData } );
}

const getUserAccount = () => {
  return axios.get( 'api/v1/account' )
}

const logOutUser = () => {
  return axios.post( 'api/v1/logout' );
}

export { fetchAllUsers, registerNewUser, loginUser, createNewUser, deleteAUser, updateCurrentUser }