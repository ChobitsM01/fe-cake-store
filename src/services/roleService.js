import axios from '../config/axios.customize';

const fetchAllRoles = async () => {
  return await axios.get( `api/v1/role/read` );
}
const deleteRole = async ( id ) => {
  // return axios.delete( 'api/v1/user/delete', { data: { id: id } } );
}

export { fetchAllRoles, deleteRole }