import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteCategory, fetchCategories } from '../../../redux/categories/categoriesSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ModalDeleteCategory = ( props ) => {
  const { dataDelete, show } = props;

  const dispatch = useDispatch();
  const onHide = () => {
    props.onHide();
  }
  const handleDeletCategory = async ( id ) => {
    let res = await dispatch( deleteCategory( id ) );
    if ( res?.payload?.EC === 0 ) {
      toast.success( 'Xóa danh mục thành công' );
      props.onHide();
    }
  }
  return (
    <>
      <Modal show={ show } onHide={ () => onHide() }>
        <Modal.Header closeButton>
          <Modal.Title>Xoá danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa danh mục: <b>{ dataDelete.name }</b> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => onHide() }>
            Hủy
          </Button>
          <Button variant="primary" onClick={ () => handleDeletCategory( dataDelete.id ) }>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteCategory;