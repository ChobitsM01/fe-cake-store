import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { registerNewUser } from "../../services/userService";
import { useState } from "react";
import './Register.css';
import { useImmer } from 'use-immer';

export default function Register () {
  const navigate = useNavigate();
  const [ email, setEmail ] = useState( '' );
  const [ name, setName ] = useState( '' );
  const [ phone, setPhone ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ repassword, setRepassword ] = useState( '' );
  const [ address, setAddress ] = useState( '' );

  const [ objCheckInput, setObjCheckInput ] = useImmer( {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidRepassword: true
  } );

  const isValidInput = () => {
    setObjCheckInput( draft => {
      draft.isValidEmail = true;
      draft.isValidPhone = true;
      draft.isValidPassword = true;
      draft.isValidRepassword = true;
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

    if ( isValid && password !== repassword ) {
      setObjCheckInput( draft => {
        draft.isValidRepassword = false;
      } );
      toast.error( 'Mật khẩu không giống nhau' );
      isValid = false;
    }

    return isValid;
  };



  const handleRegister = async () => {
    let check = isValidInput();
    console.log( check );
    if ( check === true ) {
      let response = await registerNewUser( email, name, phone, password )
      let serverData = response;
      if ( +serverData.EC === 0 ) {
        toast.success( serverData.EM );
        navigate( '/login' );
      }
      else {
        toast.error( serverData.EM );
      }
    }
  }
  return (
    <div className='register-container container mt-2'>
      <div className='form-register col-6'>
        <h1 className="text-center my-4">Đăng ký</h1>
        <div className="input-group flex-nowrap my-3">
          <span className="input-group-text">Email</span>
          <input className={ objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid' }
            value={ email }
            onChange={ ( e ) => setEmail( e.target.value ) }
            type="text" id="email"
            placeholder="Nhập địa chỉ email"
          />
        </div>

        <div className="input-group flex-nowrap my-3">
          <span className="input-group-text">Số điện thoại</span>
          <input className={ objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid' }
            value={ phone }
            onChange={ ( e ) => setPhone( e.target.value ) }
            type="text" id="phone"
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div className="input-group flex-nowrap my-3">
          <span className="input-group-text">Họ tên</span>
          <input className='form-control'
            value={ name }
            onChange={ ( e ) => setName( e.target.value ) }
            type="text" id="name"
            placeholder="Nhập họ và tên"
          />
        </div>

        <div className="input-group flex-nowrap my-3">
          <span className="input-group-text">Địa chỉ</span>
          <input className='form-control' value={ address }
            onChange={ ( e ) => setAddress( e.target.value ) }
            type="text" id="address"
            placeholder="Nhập địa chỉ"
          />
        </div>

        <div className="input-group flex-nowrap my-3">
          <span className="input-group-text">Mật khẩu</span>
          <input className={ objCheckInput.isValidPassword ?
            'form-control' : 'form-control is-invalid' }
            value={ password }
            onChange={ ( e ) => setPassword( e.target.value ) }
            type="password" id="password"
            placeholder="Nhập mật khẩu"
          />
        </div>

        <div className="input-group flex-nowrap my-3">
          <span className="input-group-text">Nhập lại mật khẩu</span>
          <input className={ objCheckInput.isValidRepassword ?
            'form-control' : 'form-control is-invalid' }
            value={ repassword }
            onChange={ ( e ) => setRepassword( e.target.value ) }
            type="password" id="repassword"
            placeholder="Xác nhận mật khẩu"
          />
        </div>

        <div>
          <button
            className='btn btn-primary btn-register mt-3 d-block mx-auto'
            onClick={ () => handleRegister() }
          >Đăng ký</button>
        </div>

        <hr />
        <div >
          <button className='btn btn-success btn-sign-up my-2 mx-auto d-block' onClick={ () => navigate( '/login' ) }>Bạn đã có tài khoản? Đăng nhập</button>
        </div>
      </div>

    </div >
  )

}