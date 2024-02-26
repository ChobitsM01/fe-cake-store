import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const OrderDetail = ( props ) => {
  const handleCloseModal = () => {
    props.onHide();
  }

  console.log( 'data: ', props.orderData );

  return (
    <Modal size='lg' show={ props.show } onHide={ () => handleCloseModal() } backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết đơn hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='content-body row'>
          <div className='form-group mt-2 col-6'>
            <label htmlFor="name">Tên khách hàng:</label>
            <input className='form-control' readOnly type="text" id="name" />
          </div>

          <div className="form-group mt-2 col-6">
            <label htmlFor="phone">Số điện thoại</label>
            <input className='form-control' readOnly type="text" id="phone" />
          </div>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ () => handleCloseModal() }>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default OrderDetail