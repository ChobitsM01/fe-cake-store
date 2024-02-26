import axios from '../config/axios.customize';

const fetchListCategories = async ( page, limit ) => {
  try {
    if ( page, limit ) {
      return await axios.get( `api/v1/category/read?page=${ page }&limit=${ limit }` );
    } else {
      return await axios.get( `api/v1/category/read` );
    }
  } catch ( error ) {
    throw error
  }
}

const fetchAllCategoryData = async () => {
  try {
    return await axios.get( 'api/v1/category/read' );
  } catch ( error ) {
    throw error
  }
}

const createNewCategory = ( name ) => {
  return axios.post( 'api/v1/category/create', { name } );
}

const updateCurrentCategory = ( categoryData ) => {
  return axios.put( 'api/v1/category/update', { ...categoryData } );
}

const deleteACategory = async ( id ) => {
  return axios.delete( 'api/v1/category/delete', { data: { id: id } } );
}

export { fetchListCategories, deleteACategory, createNewCategory, updateCurrentCategory, fetchAllCategoryData }