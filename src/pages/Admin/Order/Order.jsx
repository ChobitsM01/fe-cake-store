import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BiRefresh } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { destroyOrder, getOrders, update } from '../../../redux/order/orderSlice';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import OrderDetail from './OrderDetail';

const Order = () => {
  const dispath = useDispatch();
  const [ totalPage, setTotalPage ] = useState( 0 );
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const [ currentLimit, setCurrentLimit ] = useState( 6 );
  const [ listOrder, setListOrder ] = useState( [] );
  const [ orderData, setOrderData ] = useState( '' );
  const [ showDetail, setShowDetail ] = useState( false );
  const onDetail = () => {
    setShowDetail( false );
  }
  const fetchOrderData = async () => {
    let res = await dispath( getOrders( { page: currentPage, limit: currentLimit } ) );
    if ( res && res.payload && res.payload.EC === 0 ) {
      setTotalPage( res.payload.DT.totalPage );
      setListOrder( res.payload.DT.orders );
      console.log( 'check res: ', res.payload.DT );
    }
  }

  const handleUpdateOrder = async ( id ) => {
    let res = await dispath( update( { id, status: 'Đang giao hàng' } ) );
    if ( res && res.payload && res.payload.EC === 0 ) {
      fetchOrderData();
    }
  }

  const handleDestroyOrder = async ( id ) => {
    let res = await dispath( destroyOrder( id ) );
    if ( res && res.payload && res.payload.EC === 0 ) {
      toast.success( res.payload.EM );
      fetchOrderData();
    } else if ( res && res.payload && res.payload.EC !== 0 ) {
      toast.error( res.payload.EM )
    }
  }

  const handleUpdate = async ( id ) => {
    let res = await dispath( update( { id, status: 'Giao hàng thành công' } ) );
    if ( res && res.payload && res.payload.EC === 0 ) {
      fetchOrderData();
    }
  }

  const handlePageClick = ( event ) => {
    setCurrentPage( event.selected + 1 );
  };
  useEffect( () => {
    fetchOrderData()
  }, [ currentPage ] )
  return (
    <div className="order-container px-3">
      <h1>Danh sách đơn hàng</h1>
      <div className='user-btn mb-3'>
        <button className='btn btn-info me-3'
          onClick={ () => fetchOrderData() }
        ><BiRefresh className='icon-refresh' />Làm mới</button>
      </div>
      <table className="table table-hover table-success">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên khách hàng</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Thời gian</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {
            listOrder && listOrder.length > 0 &&
            listOrder.map( ( order, index ) => (
              <tr key={ index }>
                <td>{ ( currentPage - 1 ) * currentLimit + index + 1 }</td>
                <td>{ order.User.name }</td>
                <td>{ order.amount }</td>
                <td>{ order.status }</td>
                <td>{ order.createdAt }</td>
                <td>
                  <button
                    onClick={ () => {
                      setShowDetail( true );
                      setOrderData( order.Order_Details )
                    } }
                    className="btn btn-primary me-2">
                    Chi tiết
                  </button>
                  {
                    order && order.status === 'Đặt hàng thành công' &&
                    <button
                      onClick={ () => handleUpdateOrder( order.id ) }
                      title='Edit'
                      className='btn btn-warning me-2 btn-edit'>
                      Giao hàng
                    </button>
                  }

                  {
                    order && order.status === 'Đang giao hàng' &&
                    <button
                      onClick={ () => handleUpdate( order.id ) }
                      title='Edit'
                      className='btn btn-success me-2 btn-edit'>
                      Xác nhận
                    </button>
                  }
                  { order && order.status !== 'Giao hàng thành công' &&
                    <button
                      onClick={ () => handleDestroyOrder( order.id ) }
                      className='btn btn-danger btn-delete' title='Delete'>
                      Huỷ đơn
                    </button>
                  }
                </td>
              </tr>
            ) )
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
      <OrderDetail onHide={ onDetail } orderData={ orderData } show={ showDetail } />
    </div>
  )
}

export default Order;