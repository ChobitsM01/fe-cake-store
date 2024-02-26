import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useImmer } from 'use-immer';
import { toast } from 'react-toastify';
import { createACategory, fetchCategories } from '../../../redux/categories/categoriesSlice';
import { useDispatch } from 'react-redux';

const ModalCreateCategory = ( props ) => {
  const [ name, setName ] = useState( '' );
  const dispatch = useDispatch();

  const [ objCheckInput, setObjCheckInput ] = useImmer( { isValidName: true } );

  const isValidInput = () => {
    setObjCheckInput( draft => {
      draft.isValidName = true;
    } );

    let isValid = true;

    if ( isValid && !name ) {
      setObjCheckInput( draft => {
        draft.isValidName = false;
      } );
      toast.error( 'Tên danh mục không được để trống!' );
      isValid = false;
    }
    return isValid;
  };

  const handleOnHide = () => {
    props.onHide();
    setName( '' );
  }

  const handleCreate = async () => {
    let check = isValidInput();
    if ( check === true ) {
      let res = await dispatch( createACategory( name ) );
      if ( res?.payload?.EC === 0 ) {
        toast.success( res.payload.EM );
        handleOnHide();
      }
    }
  }

  return (
    <>
      <Modal size='lg' show={ props.show } onHide={ () => handleOnHide() } backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới danh mục sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='content-body row'>
            <div className='form-group mt-2 col-12'>
              <label htmlFor="email">Tên danh mục:</label>
              <input className={ objCheckInput.isValidName ?
                'form-control' : 'form-control is-invalid' }
                onChange={ ( e ) => setName( e.target.value ) }
                value={ name }
                type="text" id="email"
                placeholder="Nhập tên danh mục"
              />
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => handleOnHide() }>
            Hủy
          </Button>
          <Button variant="primary" onClick={ () => handleCreate() }>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateCategory;