import React, { useEffect, useState, Suspense } from "react";
import { BiRefresh } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/categories/categoriesSlice";
import ReactPaginate from "react-paginate";
import Loading from "../../../components/Loading/Loading";


const Categories = () => {
  let listCategories = [];
  let totalPage = 0;
  const res = useSelector( state => state.categories.DT );
  const dispatch = useDispatch();
  const LazyModalCreateCategory = React.lazy( () => import( "./ModalCreateCategory" ) );
  const LazyModalUpdateCategory = React.lazy( () => import( "./ModalUpdateCategory" ) );
  const LazyModalDeleteCategory = React.lazy( () => import( "./ModalDeleteCategory" ) );
  const [ showModalCreate, setShowModalCreate ] = useState( false );
  const [ showModalUpdate, setShowModalUpdate ] = useState( false );
  const [ showModalDelete, setShowModalDelete ] = useState( false );
  const [ dataUpdate, setDataUpdate ] = useState( '' );
  const [ dataDelete, setDataDelete ] = useState( '' );
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const [ currentLimit, setCurrentLimit ] = useState( 6 );

  const hideModalCreate = () => {
    setShowModalCreate( false );
    setCurrentPage( 1 );
    dispatch( fetchCategories( { currentPage: currentPage, currentLimit: currentLimit } ) );
  };
  const hideModalUpdate = () => {
    setShowModalUpdate( false );
  };
  const hideModalDelete = () => {
    setShowModalDelete( false );
    setCurrentPage( 1 );
    dispatch( fetchCategories( { currentPage: currentPage, currentLimit: currentLimit } ) );
  };

  if ( res ) {
    listCategories = res.categories;
    totalPage = res.totalPage;
  }

  const handlePageClick = ( event ) => {
    setCurrentPage( event.selected + 1 );
  };

  useEffect( () => {
    dispatch( fetchCategories( { currentPage: currentPage, currentLimit: currentLimit } ) );
  }, [ dispatch, currentPage ] );

  return (
    <div className="categoriess-container px-3">
      <h1>Danh sách danh mục</h1>
      <div className='user-btn mb-3'>
        <button className='btn btn-info me-3'>
          <BiRefresh className='icon-refresh' />
          Làm mới</button>
        <button className='btn btn-primary' onClick={ () => setShowModalCreate( true ) }>
          <BsFillPersonPlusFill className='icon-add-user' />
          Thêm danh mục</button>
      </div>
      <table className="table table-hover table-success">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {
            listCategories && listCategories.length > 0 &&
            listCategories.map( ( category, index ) =>
            (
              <tr key={ index }>
                <td>{ ( currentPage - 1 ) * currentLimit + index + 1 }</td>
                <td>{ category.name }</td>
                <td>
                  <button title='Edit'
                    className='btn btn-warning me-2 btn-edit'
                    onClick={ () => {
                      setDataUpdate( category );
                      setShowModalUpdate( true );
                    } }>
                    <FaEdit />
                  </button>

                  <button className='btn btn-danger btn-delete' title='Delete'
                    onClick={ () => {
                      setDataDelete( { id: category.id, name: category.name } );
                      setShowModalDelete( true )
                    } }
                  >
                    <MdOutlineDeleteForever />
                  </button>
                </td>
              </tr>
            )
            )
          }
        </tbody>
      </table>
      <div className='user-pagination mx-auto' style={ { width: 'fit-content', position: 'absolute', bottom: -20, left: 0, right: 0 } }>
        { totalPage > 0 &&
          <ReactPaginate
            nextLabel=" >>"
            onPageChange={ handlePageClick }
            pageRangeDisplayed={ 3 }
            marginPagesDisplayed={ 2 }
            pageCount={ totalPage }
            previousLabel="<< "
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={ null }
            forcePage={ +currentPage - 1 }
          />
        }
      </div>
      <Suspense fallback={ <Loading /> }>
        <LazyModalCreateCategory show={ showModalCreate } onHide={ () => hideModalCreate() } />
        <LazyModalUpdateCategory show={ showModalUpdate } onHide={ () => hideModalUpdate() } dataUpdate={ dataUpdate } />
        <LazyModalDeleteCategory show={ showModalDelete } onHide={ () => hideModalDelete() } dataDelete={ dataDelete } />
      </Suspense>
    </div>
  )
}

export default Categories