import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteProduct, fetchProduct } from "../../../redux/products/productSlice";
import { Modal, Button } from "react-bootstrap";

const ModalDeleteProduct = ( props ) => {
  const { dataDelete, show, currentLimit } = props;
  const dispatch = useDispatch();
  const onHide = () => {
    props.onHide();
  }

  const handleDeleteProduct = async ( id ) => {
    let res = await dispatch( deleteProduct( id ) );
    if ( res?.payload?.EC === 0 ) {
      toast.success( res.payload.EM );
      props.onHide();
      dispatch( fetchProduct( { currentPage: 1, currentLimit: currentLimit } ) )
    } else {
      toast.error( res.EM );
    }
  }
  return (
    <>
      <Modal show={ show } onHide={ () => onHide() }>
        <Modal.Header closeButton>
          <Modal.Title>Xoá sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa sản phẩm: <b>{ dataDelete.name }</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => onHide() }>
            Hủy
          </Button>
          <Button variant="primary" onClick={ () => handleDeleteProduct( dataDelete.id ) }>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteProduct;