import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from '../../../redux/user/userSlice';
import { BiRefresh } from 'react-icons/bi';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';
import ModalCreateUser from "./ModalCreateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ReactPaginate from "react-paginate";

const User = () => {
  const dispatch = useDispatch();
  let listUser = [];
  let totalPage = 0;
  const res = useSelector( state => state.users.DT );
  const [ isShowModalCreate, setIsShowModalCreate ] = useState( false );
  const [ isShowModalUpdate, setIsShowModalUpdate ] = useState( false );
  const [ isShowModalDeleteUser, setIsShowModalDelete ] = useState( false );
  const [ dataUpdate, setDataUpdate ] = useState( '' );
  const [ dataDelete, setDataDelte ] = useState( '' );
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const [ currentLimit, setCurrentLimit ] = useState( 6 );

  const onCreate = () => setIsShowModalCreate( false );
  const onUpdate = () => {
    setIsShowModalUpdate( false );
    dispatch( fetchUsers( { currentPage: currentPage, currentLimit: currentLimit } ) );
  }
  const onDelete = () => {
    setIsShowModalDelete( false );
    dispatch( fetchUsers( { currentPage: currentPage, currentLimit: currentLimit } ) );
  };

  useEffect( () => {
    dispatch( fetchUsers( { currentPage: currentPage, currentLimit: currentLimit } ) );
  }, [ dispatch, currentPage ] );

  if ( res?.EC === 0 ) {
    if ( res.DT && res.DT.users && res.DT.totalPage ) {
      listUser = res.DT.users;
      totalPage = res.DT.totalPage;
    }
  }

  const handlePageClick = ( event ) => {
    setCurrentPage( event.selected + 1 );
  };
  return (
    <div className="user-container px-3" >
      <h2>Danh sách tài khoản</h2>
      <div className='user-btn mb-3'>
        <button className='btn btn-info me-3'
          onClick={ () => { dispatch( fetchUsers( { currentPage: currentPage, currentLimit: currentLimit } ) ); } }
        ><BiRefresh className='icon-refresh' />Làm mới</button>
        <button className='btn btn-primary' onClick={ () => setIsShowModalCreate( true ) }>
          <BsFillPersonPlusFill className='icon-add-user' />
          Thêm tài khoản</button>
      </div>
      <table className="table table-hover table-success">
        <thead>
          <tr>
            <th>STT</th>
            <th>Email</th>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Quyền hạn</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          { listUser && listUser.length > 0 ?
            listUser.map( ( user, index ) => (
              <tr key={ index }>
                <td>{ ( currentPage - 1 ) * currentLimit + index + 1 }</td>
                <td>{ user.email }</td>
                <td>{ user.name }</td>
                <td>{ user.phone }</td>
                <td>{ user.Group.description }</td>
                <td>
                  <button
                    onClick={ () => {
                      setDataUpdate( user );
                      setIsShowModalUpdate( true );
                    } }
                    title='Sửa'
                    className='btn btn-warning me-2 btn-edit'
                  >
                    <FaEdit />
                  </button>
                  <button className='btn btn-danger btn-delete'
                    title='Xóa'
                    onClick={ () => {
                      setDataDelte( { id: user.id, email: user.email } );
                      setIsShowModalDelete( true )
                    } }
                  >
                    <MdOutlineDeleteForever />
                  </button>
                </td>
              </tr>
            ) )
            :
            <tr>
              <td colSpan={ 6 }>
                <center>Không có dữ liệu</center>
              </td>
            </tr>
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

      <ModalCreateUser show={ isShowModalCreate } onHide={ () => onCreate() }
        currentPage={ currentPage } currentLimit={ currentLimit }
      />
      <ModalUpdateUser show={ isShowModalUpdate } onHide={ () => onUpdate() }
        dataUpdate={ dataUpdate }
      />
      <ModalDeleteUser show={ isShowModalDeleteUser } onHide={ () => onDelete() }
        dataDelete={ dataDelete } currentPage={ currentPage } currentLimit={ currentLimit }
      />
    </div>
  )
}

export default User;