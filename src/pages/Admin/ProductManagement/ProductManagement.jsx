import { useDispatch, useSelector } from "react-redux";
import { BiRefresh } from 'react-icons/bi';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';
import React, { useState, useEffect, Suspense } from "react";
import { fetchProduct } from '../../../redux/products/productSlice';
import ReactPaginate from "react-paginate";
import Loading from "../../../components/Loading/Loading";

const ProductManagement = () => {
  let totalPage = 0;
  let products = [];
  const res = useSelector( state => state.product.DT );
  const LazyModalCreateProduct = React.lazy( () => import( "./ModalCreateProduct" ) );
  const LazyModalUpdateProduct = React.lazy( () => import( "./ModalUpdateProduct" ) );
  const LazyModalDeleteProduct = React.lazy( () => import( "./ModalDeleteProduct" ) );
  const [ showModalCreate, setShowModalCreate ] = useState( false );
  const [ showModalUpdate, setShowModalUpdate ] = useState( false );
  const [ showModalDelete, setShowModalDelete ] = useState( false );
  const [ dataUpdate, setDataUpdate ] = useState( '' );
  const [ dataDelete, setDataDelete ] = useState( '' );
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const [ currentLimit, setCurrentLimit ] = useState( 6 );

  const onCreate = () => {
    setShowModalCreate( false );
  };
  const onUpdate = () => { setShowModalUpdate( false ) };
  const onDelete = () => {
    setShowModalDelete( false );
  };
  const handlePageClick = ( event ) => {
    setCurrentPage( event.selected + 1 );
  };
  if ( res?.EC === 0 ) {
    products = res.DT.products;
    totalPage = res.DT.totalPage;
  }

  Number.prototype.format = function ( n, x ) {
    const re = '\\d(?=(\\d{' + ( x || 3 ) + '})+' + ( n > 0 ? '\\.' : '$' ) + ')';
    return this.toFixed( Math.max( 0, ~~n ) ).replace( new RegExp( re, 'g' ), '$&,' );
  };

  const dispatch = useDispatch();
  useEffect( () => {
    dispatch( fetchProduct( { currentPage: currentPage, currentLimit: currentLimit } ) );
  }, [ dispatch, currentPage ] )

  return (
    <div className="user-container px-3">
      <h2>Danh sách sản phẩm</h2>
      <div className='user-btn mb-3'>
        <button className='btn btn-info me-3'>
          <BiRefresh className='icon-refresh' />Làm mới
        </button>
        <button className='btn btn-primary' onClick={ () => setShowModalCreate( true ) }>
          <BsFillPersonPlusFill className='icon-add-user' />
          Thêm sản phẩm</button>
      </div>
      <table className="table table-hover table-success">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Ảnh</th>
            <th>Danh mục</th>
            <th className="text-end">Đơn giá</th>
            <th className="text-end">Số lượng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {
            products && products.length > 0 ?
              products.map( ( product, index ) => (
                <tr key={ index }>
                  <td>{ ( currentPage - 1 ) * currentLimit + index + 1 }</td>
                  <td >{ product.name }</td>
                  <td><img style={ { height: 40, width: 40 } } src={ product.image } alt="" /></td>
                  <td>{ product.Category.name }</td>
                  <td className="text-end">{ product.price.format() }</td>
                  <td className="text-end">{ product.quantity }</td>
                  <td>
                    <button
                      onClick={ () => {
                        setDataUpdate( product );
                        setShowModalUpdate( true );
                      } }
                      title='Edit'
                      className='btn btn-warning me-2 btn-edit'
                    >
                      <FaEdit />
                    </button>
                    <button className='btn btn-danger btn-delete'
                      title='Delete'
                      onClick={ () => {
                        setDataDelete( { id: product.id, name: product.name } );
                        setShowModalDelete( true )
                      } }
                    >
                      <MdOutlineDeleteForever />
                    </button>
                  </td>
                </tr>
              ) )
              :
              <tr>
                <td colSpan={ 7 }><center>Không có sản phẩm nào</center></td>
              </tr>

          }
        </tbody>
      </table>

      <div className='user-pagination mx-auto' style={ { width: 'fit-content', position: 'absolute', bottom: - 20, left: 0, right: 0 } }>
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
        <LazyModalCreateProduct show={ showModalCreate } onHide={ () => onCreate() } />
        <LazyModalUpdateProduct show={ showModalUpdate } onHide={ () => onUpdate() } dataUpdate={ dataUpdate } />
        <LazyModalDeleteProduct show={ showModalDelete } onHide={ () => onDelete() } dataDelete={ dataDelete } currentLimit={ currentLimit } />
      </Suspense>

    </div>
  )
}

export default ProductManagement;