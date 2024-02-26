import { useDispatch, useSelector } from "react-redux";
import { selectAmount, selectPurchasedProducts } from "../../redux/cart/cartSlice";
import { selectUser } from "../../redux/account/accountSlice";
import { useState } from "react";
import { createAnOrder } from "../../redux/order/orderSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const amount = useSelector( selectAmount );
  const userInfor = useSelector( selectUser );
  const purchasedProducts = useSelector( selectPurchasedProducts );
  const [ address, setAddress ] = useState( userInfor.account.address || '' );
  const [ paymentMethod, setPaymentMethod ] = useState();

  const handleOnchangeAddress = ( e ) => {
    setAddress( e.target.value );
  }

  // userId, amount
  // orderId, productid, productname, productprice, productquantity, amount
  const handleClickBtnCheckout = async () => {
    let data = {
      userId: userInfor.account.id,
      amount,
      status: 'Đặt hàng thành công',
      purchasedProducts
    }
    let res = await dispatch( createAnOrder( data ) );
    if ( res && res.payload && res.payload.EC === 0 ) {
      toast.success( res.payload.EM );
      navigate( '/' )
    }
  }

  Number.prototype.format = function ( n, x ) {
    const re = '\\d(?=(\\d{' + ( x || 3 ) + '})+' + ( n > 0 ? '\\.' : '$' ) + ')';
    return this.toFixed( Math.max( 0, ~~n ) ).replace( new RegExp( re, 'g' ), '$&,' );
  };



  return (
    <div className="checkout-container container row col-12 justify-content-center">
      <div className="user-infor col-6 me-4">
        <div className="form-group">
          <label htmlFor="name">Tên khách hàng</label>
          <input id="name" type="text" className="form-control" readOnly value={ userInfor.account.name } />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Email:</label>
          <input id="phone" type="text" className="form-control" readOnly value={ userInfor.account.email } />
        </div>
        <div className="form-group">
          <label htmlFor="address">Địa chỉ</label>
          <input id="address" type="text"
            onChange={ ( e ) => handleOnchangeAddress( e ) }
            className="form-control" value={ address } />
        </div>
        <div className='col-4 form-group mt-2'>
          <label >Hình thức thanh toán</label>
          <select className='form-select' onChange={ ( e ) => setPaymentMethod( e.target.value ) } value={ paymentMethod }>
            <option value="cash">Tiền mặt</option>
            <option value="momo">Ví điện tử Momo</option>
          </select>
        </div>
      </div>
      <div className="order-infor mt-4 d-flex">
        <div className="amount ms-auto my-4">
          Tiền thanh toán: <b>{ amount.format() }VNĐ</b>
        </div>
      </div>
      <div className="checkout-footer d-flex">
        <button
          disabled={ amount > 0 ? false : true }
          onClick={ () => handleClickBtnCheckout() }
          className="btn btn-primary ms-auto mt-2">Thanh toán</button>
      </div>
    </div>
  )
}


export default Checkout;