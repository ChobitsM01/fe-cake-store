import axios from '../config/axios.customize';

const fetchUserRoles = async ( id ) => {
  try {
    return await axios.get( `api/v1/group-role/read?groupId=${ id }` );
  } catch ( error ) {
    throw error
  }
}

const assignRoles = ( data ) => {
  return axios.post( 'api/v1/group-role/create', { data } );
}

const deleteUserRole = async ( id ) => {
  return axios.delete( 'api/v1/group-role/delete', { data: { id: id } } );
}

export { fetchUserRoles, assignRoles, deleteUserRole }