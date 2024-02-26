import { NavLink, useNavigate } from "react-router-dom";
import './Header.scss';
import logo from '../../../public/img/logo.jpg';
import cart_icon from '../../../public/img/cart-icon.jpg';
import search_icon from '../../../public/img/search-icon.jpg';
import { BsFillPersonFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUser } from "../../redux/account/accountSlice";
import { useEffect, useState } from "react";
import { fetchCart, selectTotalQuantity } from "../../redux/cart/cartSlice";
import { searchProducts } from "../../redux/products/productSlice";

import { FaShoppingCart } from 'react-icons/fa'

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector( selectUser );
  const cartQuantity = useSelector( selectTotalQuantity );
  const [ keyword, setKeyword ] = useState( '' );
  const [ showUserMenu, setShowUserMenu ] = useState( false )
  useEffect( () => {
    if ( user.isAuthenticated === true ) {
      dispatch( fetchCart( user.account.id ) )
    }
  }, [ cartQuantity ] );
  const handleLogOut = () => {
    dispatch( clearUser() );
    navigate( '/login' )
  }

  const handleOnchangInput = ( value ) => {
    setKeyword( value );
  }

  const handleSearch = async () => {
    let res = await dispatch( searchProducts( keyword ) );
    handleOnchangInput( '' )
    navigate( '/search' );
  }

  const toggleMenu = () => {
    setShowUserMenu( !showUserMenu );
  };

  return (
    <div className="header">
      <div className="header--top " >
        <div className="container d-flex align-items-center">
          <div className="header--logo" onClick={ () => navigate( '/' ) }>
            <img className="header--logo__img" src={ logo } alt="Logo" />
          </div>
          <div className="search-container">
            <div className="search-box">
              <input
                onChange={ ( e ) => handleOnchangInput( e.target.value ) }
                type="text" className="search-input"
                placeholder="Tìm kiếm sản phẩm" />
              <button
                onClick={ () => handleSearch() }
                className="search__btn">
                <img src={ search_icon } alt="search" className="search-icon" />
              </button>
            </div>
          </div>
          <div className='user-container me-4'>
            <div className="account-icon  text-primary clickable">
              {
                user && user.isAuthenticated === true ?
                  <div onClick={ () => toggleMenu() } >
                    <BsFillPersonFill color="#fff" />
                    <span style={ { fontSize: '18px', color: '#fff' } }>{ user.account.name }</span>
                  </div>
                  : <div onClick={ () => navigate( '/login' ) }><BsFillPersonFill color="#fff" /><span className="fs-5">Tài khoản</span></div>
              }
            </div>

            <div className="menu-user bg-white px-4">
              {
                showUserMenu &&
                <div className="toggle-menu">
                  <div className="menu-user-item py-1 clickable" >Lịch sử mua hàng</div>
                  <div className="menu-user-item py-1 clickable" onClick={ () => handleLogOut() }>Đăng xuất</div>
                </div>
              }
            </div>
          </div>
          <NavLink to='/cart'>
            <div className="cart-container">
              <FaShoppingCart color="#fff" className="cart-icon" />
              <div className="cart-quantity">
                { cartQuantity ? <span>{ cartQuantity }</span> : <span>0</span> }
              </div>
            </div>
          </NavLink>
        </div>
      </div>
      <div className="header--bot">
        <div className="header--nav d-flex align-items-center justify-content-between mx-auto" style={ { width: 500 } }>
          <NavLink to='/'>Trang chủ</NavLink >
          <NavLink to='/products'>Sản phẩm</NavLink>
          <NavLink to='/cart'>Giỏ hàng</NavLink>
          {/* <NavLink to='/feedback'>Phản hồi</NavLink> */ }
        </div>
      </div>
    </div>
  )
}