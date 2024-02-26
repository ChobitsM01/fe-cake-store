import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useImmer } from 'use-immer';
import { toast } from 'react-toastify';
import { fetchGroup } from '../../../redux/userGroup/userGroupSlice';
import { createAUser, fetchUsers } from '../../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const ModalUser = ( props ) => {
  const userGroup = useSelector( state => state.groups.userGroup );
  const [ email, setEmail ] = useState( '' );
  const [ name, setName ] = useState( '' );
  const [ phone, setPhone ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ address, setAddress ] = useState( '' );
  const [ groupId, setGroupId ] = useState( 4 );
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( fetchGroup() );
  }, [ dispatch ] );

  const [ objCheckInput, setObjCheckInput ] = useImmer( {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true
  } );

  const isValidInput = () => {
    setObjCheckInput( draft => {
      draft.isValidEmail = true;
      draft.isValidPhone = true;
      draft.isValidPassword = true;
    } );

    let isValid = true;

    if ( !email ) {
      setObjCheckInput( draft => {
        draft.isValidEmail = false;
      } );
      toast.error( 'Email không được để trống!' );
      isValid = false;
    } else {
      let regex = /\S+@\S+\.\S+/;
      if ( !regex.test( email ) ) {
        setObjCheckInput( draft => {
          draft.isValidEmail = false;
        } );
        toast.error( 'Email sai định dạng' );
        isValid = false;
      }
    }
    if ( isValid && !phone ) {
      setObjCheckInput( draft => {
        draft.isValidPhone = false;
      } );
      toast.error( 'Số điện thoại không được để trống!' );
      isValid = false;
    }
    if ( isValid && !password ) {
      setObjCheckInput( draft => {
        draft.isValidPassword = false;
      } );
      toast.error( 'Mật khẩu không được để trống!' );
      isValid = false;
    }
    return isValid;
  };

  const handleCloseModalUser = () => {
    dispatch( fetchUsers( { currentPage: props.currentPage, currentLimit: props.currentLimit } ) );
    props.onHide();
    setEmail( '' );
    setName( '' );
    setPhone( '' );
    setPassword( '' );
    setAddress( '' );
    setGroupId( '4' );
  }

  const handleCreateUser = async () => {
    let check = isValidInput();
    if ( check === true ) {
      let res = await dispatch( createAUser( { email, phone, name, password, address, groupId } ) );
      if ( res?.payload?.EC === 0 ) {
        toast.success( res.payload.EM );
        handleCloseModalUser();
        dispatch( fetchUsers() )
      }
    }
  }

  return (
    <>
      <Modal size='lg' show={ props.show } onHide={ () => handleCloseModalUser() } backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='content-body row'>
            <div className='form-group mt-2 col-6'>
              <label htmlFor="email">Email:</label>
              <input className={ objCheckInput.isValidEmail ?
                'form-control' : 'form-control is-invalid' }
                onChange={ ( e ) => setEmail( e.target.value ) }
                value={ email }
                type="text" id="email"
                placeholder="Nhập địa chỉ email"
              />
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="phone">Số điện thoại</label>
              <input className={ objCheckInput.isValidPhone ?
                'form-control' : 'form-control is-invalid' }
                onChange={ ( e ) => setPhone( e.target.value ) }
                value={ phone }
                type="text" id="phone"
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="name">Họ tên:</label>
              <input className='form-control'
                onChange={ ( e ) => setName( e.target.value ) }
                value={ name }
                type="text" id="name"
                placeholder="Nhập họ và tên"
              />
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="password">Mật khẩu:</label>
              <input className={ objCheckInput.isValidPassword ?
                'form-control' : 'form-control is-invalid' }
                onChange={ ( e ) => setPassword( e.target.value ) }
                value={ password }
                type="password" id="password"
                placeholder="Nhập mật khẩu"
              />
            </div>

            <div className="form-group mt-2 col-8">
              <label htmlFor="address">Địa chỉ:</label>
              <input className='form-control'
                onChange={ ( e ) => setAddress( e.target.value ) }
                value={ address }
                type="text" id="address"
                placeholder="Nhập địa chỉ"
              />
            </div>
            <div className='col-4 form-group mt-2'>
              <label >Nhóm quyền</label>
              <select className='form-select' onChange={ ( e ) => setGroupId( e.target.value ) } value={ groupId }>
                {
                  userGroup.length > 0 && userGroup.map( ( item, index ) => {
                    return (
                      <option key={ `group-${ index }` } value={ item.id }>{ item.name }</option> )
                  } )
                }

              </select>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => handleCloseModalUser() }>
            Hủy
          </Button>
          <Button variant="primary" onClick={ () => handleCreateUser() }>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUser;