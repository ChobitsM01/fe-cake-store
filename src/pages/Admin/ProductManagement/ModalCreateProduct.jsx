import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useImmer } from 'use-immer';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '../../../redux/categories/categoriesSlice';
import { useEffect } from 'react';
import { createProduct } from '../../../redux/products/productSlice';
import axios from 'axios';

const ModalCreateProduct = ( props ) => {
  let categories = [];
  const res = useSelector( state => state.categories.result );
  const [ name, setName ] = useState( '' );
  const [ image, setImage ] = useState( '' );
  const [ file, setFile ] = useState( null );
  const [ price, setPrice ] = useState( '' );
  const [ quantity, setQuantity ] = useState( '' );
  const [ category, setCategory ] = useState( '' );
  const dispatch = useDispatch();

  const [ objCheckInput, setObjCheckInput ] = useImmer( {
    isValidName: true,
    isValidPrice: true,
    isValidquantity: true,
  } );

  useEffect( () => {
    dispatch( fetchAllCategories() );
  }, [] );

  if ( res?.EC === 0 ) {
    categories = res.DT;
  }

  const isValidInput = () => {
    setObjCheckInput( draft => {
      draft.isValidName = true;
      draft.isValidPrice = true;
      draft.isValidquantity = true;
    } );

    let isValid = true;

    if ( isValid && !name ) {
      setObjCheckInput( draft => {
        draft.isValidName = false;
      } );
      toast.error( 'Tên sản phẩm không được để trống!' );
      isValid = false;
    }


    if ( isValid && !price ) {
      setObjCheckInput( draft => {
        draft.isValidPrice = false;
      } );
      toast.error( 'Giá sản phẩm không được để trống!' );
      isValid = false;
    }


    if ( isValid && !quantity ) {
      setObjCheckInput( draft => {
        draft.isValidquantity = false;
      } );
      toast.error( 'Số lượng sản phẩm không được để trống!' );
      isValid = false;
    }

    // if ( isValid && !category ) {
    //   setObjCheckInput( draft => {
    //     draft.isValidcategory = false;
    //   } );
    //   toast.error( 'Danh mục không được để trống!' );
    //   isValid = false;
    // }
    return isValid;
  };

  const handleOnHide = () => {
    props.onHide();
  }

  const handleImageChange = ( e ) => {
    const selectedImage = e.target.files[ 0 ];
    setImage( selectedImage.name );
    setFile( selectedImage );
  };

  const handleCreate = async () => {
    let check = isValidInput();
    const formData = new FormData();
    formData.append( "file", file );
    formData.append( 'name', name );
    formData.append( 'image', image );
    formData.append( 'price', price );
    formData.append( 'quantity', quantity );
    formData.append( 'category', category );
    if ( check ) {
      let res = await dispatch( createProduct( formData ) );
      if ( res?.payload?.EC === 0 ) {
        toast.success( res.payload.EM );
      } else if ( res?.payload?.EC !== 0 ) {
        toast.error( res.payload.EM );
      }
    }
  }

  return (
    <>
      <Modal size='lg' show={ props.show } onHide={ () => handleOnHide() } backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='content-body row'>
            <div className='form-group mt-2 col-6'>
              <label htmlFor="name">Tên sản phẩm:</label>
              <input className={ objCheckInput.isValidName ?
                'form-control' : 'form-control is-invalid' }
                onChange={ ( e ) => setName( e.target.value ) }
                value={ name }
                type="text" id="name"
                placeholder="Nhập tên sản phẩm"
              />
            </div>
            <div className='form-group mt-2 col-6'>
              <label htmlFor="image">Ảnh:</label>
              <input className='form-control'
                onChange={ ( e ) => handleImageChange( e ) }
                type="file" id="image"
              />
            </div>
            <div className='form-group mt-2 col-6'>
              <label htmlFor="price">Giá:</label>
              <input className={ objCheckInput.isValidName ?
                'form-control' : 'form-control is-invalid' }
                onChange={ ( e ) => setPrice( e.target.value ) }
                value={ price }
                type="text" id="price"
                placeholder="Nhập giá sản phẩm"
              />
            </div>
            <div className='form-group mt-2 col-6'>
              <label htmlFor="quantity">Số lượng:</label>
              <input className={ objCheckInput.isValidName ?
                'form-control' : 'form-control is-invalid' }
                onChange={ ( e ) => setQuantity( e.target.value ) }
                value={ quantity }
                type="text" id="quantity"
                placeholder="Nhập số lượng"
              />
            </div>
            <div className='col-12 form-group mt-2'>
              <label >Danh mục:</label>
              <select className='form-select' onChange={ ( e ) => setCategory( e.target.value ) } value={ category }>
                {
                  categories.length > 0 && categories.map( ( item, index ) => {
                    return (
                      <option key={ `category-${ index }` } value={ item.id }>{ item.name }</option>
                    )
                  } )
                }
              </select>
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

export default ModalCreateProduct;