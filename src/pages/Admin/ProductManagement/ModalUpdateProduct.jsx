import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { fetchAllCategories } from "../../../redux/categories/categoriesSlice";
import { updateProduct } from "../../../redux/products/productSlice";

const ModalUpdateProduct = ( props ) => {
  const dispatch = useDispatch();
  const { dataUpdate } = props;
  const [ name, setName ] = useState( '' );
  const [ image, setImage ] = useState( '' );
  const [ file, setFile ] = useState( null );
  const [ previewImage, setPreviewImage ] = useState( null );
  const [ price, setPrice ] = useState( '' );
  const [ quantity, setQuantity ] = useState( '' );
  const [ categoryId, setCategoryId ] = useState( '' );
  const [ categories, setCategories ] = useState( '' );

  const fetchCategory = async () => {
    let data = await dispatch( fetchAllCategories() );
    if ( data ) {
      let _categories = data?.payload?.DT ?? '';
      setCategories( _categories );
    }
  }

  useEffect( () => {
    let _name = dataUpdate?.name ?? '';
    let _image = dataUpdate?.image ?? '', _categoryId = dataUpdate?.categoryId ?? '';
    let _price = dataUpdate?.price ?? '', _quantity = dataUpdate?.quantity ?? '';
    setName( _name );
    setPreviewImage( _image );
    setCategoryId( _categoryId );
    setPrice( _price );
    setQuantity( _quantity );
    fetchCategory();
  }, [ dataUpdate ] )

  const [ objCheckInput, setObjCheckInput ] = useImmer( {
    isValidName: true,
    isValidPrice: true,
    isValidquantity: true,
  } );

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

  const handleImageChange = ( e ) => {
    const selectedImage = e.target.files[ 0 ];
    setImage( selectedImage?.name );
    setFile( selectedImage );
    const imageUrl = URL.createObjectURL( selectedImage );
    if ( imageUrl ) {
      setPreviewImage( imageUrl );
    }
  };

  const handleUpdate = async () => {
    console.log( 'check file: ', file );
    console.log( 'check file name: ', file?.name );
    const formData = new FormData();
    formData.append( "id", dataUpdate.id );
    formData.append( "name", name );
    formData.append( "price", price );
    formData.append( "quantity", quantity );
    formData.append( "categoryId", categoryId );
    if ( file && file !== null ) {
      formData.append( "file", file );
      formData.append( "image", file?.name );
    }
    const res = await dispatch( updateProduct( formData ) );
    if ( res ) {
      console.log( 'check res: ', res );
    }
  }
  return (
    <>
      <Modal size='lg' show={ props.show } onHide={ () => props.onHide() } backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Sửa thông tin sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='content-body row'>
            <div className="product-infor col-6 pe-4">
              <div className='form-group mt-2 col-12'>
                <label htmlFor="name">Tên sản phẩm:</label>
                <input className={ objCheckInput.isValidName ?
                  'form-control' : 'form-control is-invalid' }
                  onChange={ ( e ) => setName( e.target.value ) }
                  value={ name }
                  type="text" id="name"
                  placeholder="Nhập tên sản phẩm"
                />
              </div>

              <div className='form-group mt-2 col-12'>
                <label htmlFor="price">Giá:</label>
                <input className={ objCheckInput.isValidName ?
                  'form-control' : 'form-control is-invalid' }
                  onChange={ ( e ) => setPrice( e.target.value ) }
                  value={ price }
                  type="text" id="price"
                  placeholder="Nhập giá sản phẩm"
                />
              </div>
              <div className='form-group mt-2 col-12'>
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
                <select className='form-select' onChange={ ( e ) => setCategoryId( e.target.value ) } value={ categoryId }>
                  {
                    categories && categories.length > 0 && categories.map( ( item, index ) => {
                      return (
                        <option key={ `category-${ index }` } value={ item.id }>{ item.name }</option>
                      )
                    } )
                  }
                </select>
              </div>
            </div>
            <div className="product-image col-6 ps-4">
              <div className='form-group mt-2 col-6'>
                <label>Ảnh:</label>
                <div>
                  <label htmlFor="image" className="clickable">
                    <img src={ previewImage } alt="" height={ 250 } width={ 300 } />
                  </label>
                </div>
                <input hidden className='form-control'
                  onChange={ ( e ) => handleImageChange( e ) }
                  type="file" id="image"
                />
              </div>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => props.onHide() }>
            Hủy
          </Button>
          <Button variant="primary" onClick={ () => handleUpdate() }>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalUpdateProduct