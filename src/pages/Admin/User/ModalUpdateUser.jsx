import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { fetchGroup } from '../../../redux/userGroup/userGroupSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { updateUser } from '../../../redux/user/userSlice';

const ModalUpdateUser = ( props ) => {
  const { dataUpdate } = props;
  const [ name, setName ] = useState( '' );
  const [ groupId, setGroupId ] = useState( '' );

  const userGroup = useSelector( state => state.groups.userGroup );
  const dispatch = useDispatch();
  useEffect( () => {
    let _name = dataUpdate?.name ?? ''
    setName( _name );
    let _id = dataUpdate?.Group?.id ?? ''
    setGroupId( _id );
  }, [ dataUpdate ] );

  const [ objCheckInput, setObjCheckInput ] = useImmer( {
    isValidName: true,
  } );

  const isValidInput = () => {
    setObjCheckInput( draft => {
      draft.isValidName = true;
    } );

    let isValid = true;
    if ( isValid && !name ) {
      setObjCheckInput( draft => {
        draft.isValidName = false;
      } );
      toast.error( 'Tên người dùng không được để trống!' );
      isValid = false;
    }
    return isValid;
  };

  const handleUpdateUser = async ( name, groupId ) => {
    let check = isValidInput();
    if ( check ) {
      let res = await dispatch( updateUser( { id: dataUpdate.id, name, groupId } ) );
      if ( res && res.payload && res.payload.EC === 0 ) {
        toast.success( res.payload.EM );
        props.onHide();
      } else if ( res && res.payload && res.payload.EC !== 0 ) {
        toast.error( res.payload.EM )
      }
    }
  }

  const handleCloseModal = () => {
    props.onHide();
    setName( '' )
  }

  if ( userGroup && dataUpdate.groupId ) {
    groupData = userGroup.find( ( item ) => item.id === dataUpdate.groupId );
  };

  useEffect( () => {
    dispatch( fetchGroup() );
  }, [ dispatch ] );

  return (
    <>
      <Modal size='lg' show={ props.show } onHide={ () => handleCloseModal() } backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='content-body row'>
            <div className='form-group mt-2 col-6'>
              <label htmlFor="email">Email:</label>
              <input className='form-control' readOnly value={ dataUpdate.email } type="text" id="email" />
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="phone">Số điện thoại</label>
              <input className='form-control' readOnly value={ dataUpdate.phone } type="text" id="phone" />
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="name">Họ tên:</label>
              <input className={ objCheckInput.isValidName ?
                'form-control' : 'form-control is-invalid' }
                name="username"
                onChange={ ( e ) => setName( e.target.value ) }
                value={ name }
                type="text" id="name"
              />
            </div>
            <div className='col-6 form-group mt-2'>
              <label >Nhóm quyền</label>
              <select className='form-select' onChange={ ( e ) => setGroupId( e.target.value ) } value={ groupId }>
                {
                  userGroup.length > 0 && userGroup.map( ( item, index ) => {
                    return (
                      <option key={ `group-${ index }` } value={ item.id }>{ item.description }</option> )
                  } )
                }

              </select>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => handleCloseModal() }>
            Hủy
          </Button>
          <Button variant="primary" onClick={ () => handleUpdateUser( name, groupId ) }>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateUser;