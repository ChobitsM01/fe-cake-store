import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories, updateCategory } from '../../../redux/categories/categoriesSlice';
import { useImmer } from 'use-immer';

const ModalUpdateCategory = ( props ) => {
  const { dataUpdate } = props;
  const [ name, setName ] = useState( '' );
  const dispatch = useDispatch();
  useEffect( () => { setName( dataUpdate?.name ) }, [ dataUpdate ] );
  const [ objCheckInput, setObjCheckInput ] = useImmer( {
    isValidName: true,
  } );
  const isValidInput = () => {
    setObjCheckInput( draft => { draft.isValidName = true; } );

    let isValid = true;
    if ( !name ) {
      setObjCheckInput( draft => {
        draft.isValidName = false;
      } );
      toast.error( 'Tên danh mục không được để trống!' );
      isValid = false;
    }
    return isValid;
  };

  const handleUpdateCategory = async () => {
    let check = isValidInput();
    if ( check ) {
      let res = await dispatch( updateCategory( { id: dataUpdate.id, name: name } ) );
      if ( res?.payload?.EC === 0 ) {
        toast.success( res.payload.EM );
        dispatch( fetchCategories() );
        handleCloseModal();
      }
    }
  }
  useEffect( () => {
    setName( dataUpdate?.name )
  }, [ dataUpdate ] )

  const handleCloseModal = () => {
    props.onHide();
    setName( '' );
  }

  return (
    <>
      <Modal size='lg' show={ props.show } onHide={ () => handleCloseModal() } backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-group mt-2 col-12">
              <label htmlFor="name">Tên danh mục:</label>
              <input className={ objCheckInput.isValidName ?
                'form-control' : 'form-control is-invalid' }
                onChange={ ( e ) => setName( e.target.value ) }
                value={ name }
                type="text" id="name"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => handleCloseModal() }>
            Hủy
          </Button>
          <Button variant="primary" onClick={ () => handleUpdateCategory() }>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateCategory;