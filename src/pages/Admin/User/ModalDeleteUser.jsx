import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser, fetchUsers } from '../../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ModalDeleteUser = ( props ) => {
  const { dataDelete, show } = props;

  const dispatch = useDispatch();
  const onHide = () => {
    props.onHide();
  }

  const handleDeleteUser = async ( id ) => {
    let res = await dispatch( deleteUser( id ) );
    console.log( 'res: ', res );
    if ( res?.payload?.EC === 0 ) {
      props.onHide();
      toast.success( res.payload.EM );
    } else {
      toast.error( res.payload.EM )
    }
  }
  return (
    <>
      <Modal show={ show } onHide={ () => onHide() }>
        <Modal.Header closeButton>
          <Modal.Title>Xoá người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa người dùng có email: <b>{ dataDelete.email }</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => onHide() }>
            Hủy
          </Button>
          <Button variant="primary" onClick={ () => handleDeleteUser( dataDelete.id ) }>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;