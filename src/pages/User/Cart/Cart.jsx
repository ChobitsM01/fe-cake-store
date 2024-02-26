import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectUser } from "../../../redux/account/accountSlice";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAProductInCart, fetchCart, selectCartItem, selectPurchasedProducts, setAmount, setPurchasedProducts } from "../../../redux/cart/cartSlice";
import { toast } from "react-toastify";
import './Cart.scss'


const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector( selectUser );
  const listItems = useSelector( selectCartItem );
  const [ checkedItems, setCheckedItems ] = useState( {} );


  let userId = user.account.id;
  let purchasedProducts = [];
  let totalPrice = 0;

  const calculateTotalPrice = () => {
    listItems.forEach( item => {
      if ( checkedItems[ item.id ] ) {
        totalPrice += item.productPrice * item.productQuantity;
        purchasedProducts.push( item );
      }
    } );
    return totalPrice.format();
  }


  const handleCheckboxChange = ( id ) => {
    setCheckedItems( prevState => ( {
      ...prevState,
      [ id ]: !prevState[ id ]
    } ) );
  }

  const handleDeleteCartItem = async ( id ) => {
    let res = await dispatch( deleteAProductInCart( { userId: user.account.id, productId: id } ) );
    if ( res && res.payload && res.payload.EC === 0 ) {
      dispatch( fetchCart( userId ) )
      toast.success( res.payload.EM );
    }
  }

  const handleBtnCheckout = () => {
    dispatch( setPurchasedProducts( purchasedProducts ) );
    dispatch( setAmount( totalPrice ) );
    navigate( '/checkout' );
  }

  Number.prototype.format = function ( n, x ) {
    const re = '\\d(?=(\\d{' + ( x || 3 ) + '})+' + ( n > 0 ? '\\.' : '$' ) + ')';
    return this.toFixed( Math.max( 0, ~~n ) ).replace( new RegExp( re, 'g' ), '$&,' );
  };

  useEffect( () => {
    dispatch( fetchCart( userId ) );
  }, [] );
  return (
    <div className="cart-container container d-flex">
      <div className="cart-content col-9 me-4">
        <table className="table table-light">
          <thead>
            <tr>
              <th></th>
              <th>Tên sản phẩm</th>
              <th>Ảnh</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tổng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            { listItems && listItems.length > 0 ? listItems.map( ( item, index ) => (
              <tr key={ index }>
                <td onClick={ () => handleCheckboxChange( item.id ) } className="clickable">
                  <input
                    checked={ !!checkedItems[ item.id ] }
                    readOnly
                    // onChange={ () => handleCheckboxChange( item.id ) }
                    type="checkbox" />
                </td>
                <td>{ item.productName }</td>
                <td><img src={ item.productImage } width={ 40 } height={ 40 } /></td>
                <td>{ item.productPrice }</td>
                <td>{ item.productQuantity }</td>
                <td>{ item.amount }</td>
                <td>
                  <button
                    onClick={ () => handleDeleteCartItem( item.productId ) }
                    className="btn btn-danger btn-delete">
                    <MdOutlineDeleteForever />
                  </button>
                </td>
              </tr>
            ) ) : <></> }
          </tbody>
        </table>
      </div>
      <div className="action-cart-container col-3 ">
        <div className="action-cart">
          <div className="amount-cart fw-bold">Tổng thanh toán: { calculateTotalPrice() }</div>
          <div className="btn-buy d-flex">
            <button
              disabled={ totalPrice > 0 ? false : true }
              className="btn btn-primary mt-4 ms-auto"
              onClick={ () => handleBtnCheckout() }>Mua hàng</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;