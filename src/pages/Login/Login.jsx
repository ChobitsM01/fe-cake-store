import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import { loginUser } from "../../services/userService";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/account/accountSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ account, setAccount ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const defaultObjInput = {
    isValidAccount: true,
    isValidPassword: true
  }
  const [ objInput, setObjInput ] = useState( defaultObjInput );
  const handleKeyPress = ( e ) => {
    if ( e.key === "Enter" || e.keyCode === 13 ) {
      handleLogin();
    }
  }

  const handleLogin = async () => {
    setObjInput( defaultObjInput );
    if ( !account ) {
      setObjInput( { ...defaultObjInput, isValidAccount: false } );
      toast.error( 'Thông tin tài khoản không được để trống' );
      return
    }
    if ( !password ) {
      setObjInput( { ...defaultObjInput, isValidPassword: false } );
      toast.error( 'Mật khẩu không được để trống' );
      return
    }
    let response = await loginUser( account, password );
    if ( response && + response.EC === 0 ) {
      dispatch( setUser( {
        id: response?.DT?.payload?.id,
        name: response?.DT?.payload?.name,
        email: response?.DT?.payload?.email,
        address: response?.DT?.payload?.address,
        userRoles: response?.DT?.payload?.userRoles?.name
      } ) )
      toast.success( response.EM );
      navigate( '/' );
    }
    if ( response && + response.EC !== 0 ) {
      toast.error( response.EM );
    }
  }

  return (
    <div className='login-container container d-flex'>
      <div className='col-6 mx-auto mt-4'>
        <div className='form-login'>
          <h1 className="text-center">Đăng nhập</h1>
          <input
            className={ objInput.isValidAccount ? 'form-control mt-3' : 'form-control is-invalid mt-3' }
            value={ account }
            onChange={ ( e ) => setAccount( e.target.value ) }
            type="text" name="email"
            placeholder="Địa chỉ email hoặc số điện thoại" />

          <input
            className={ objInput.isValidPassword ? 'form-control mt-3' : 'form-control is-invalid mt-3' }
            value={ password }
            onChange={ ( e ) => setPassword( e.target.value ) }
            type="password" name="password"
            placeholder='Mật khẩu'
            onKeyDown={ ( e ) => handleKeyPress( e ) }
          />

          <button className='d-block mx-auto btn btn-primary btn-login mt-3' onClick={ () => handleLogin() }>Đăng nhập</button>

          {/* <span className='d-block text-center mt-3'>
            <a className='forgot-pass' href='#'>Quên mật khẩu?</a>
          </span> */}

          <hr />

          <div >
            <button className='btn btn-success btn-sign-up text-center my-4 mx-auto d-block' onClick={ () => navigate( '/register' ) }>Đăng ký thành viên mới</button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Login;