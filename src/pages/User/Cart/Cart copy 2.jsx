import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, getUserCart, selectCartItem, selectCartRes, selectTotalQuantity } from "../../../redux/cart/cartSlice";
import { useEffect } from "react";
import { selectUser } from "../../../redux/account/accountSlice";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  let user = useSelector( selectUser );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listItems = useSelector( selectCartItem );
  let userId = 0;
  if ( user && user.account ) {
    userId = user.account.id;
  }

  const [ checkedItems, setCheckedItems ] = useState( {} ); // Thêm state để lưu trạng thái checkbox

  const handleCheckboxChange = ( id ) => {
    setCheckedItems( prevState => ( {
      ...prevState,
      [ id ]: !prevState[ id ] // Đảo ngược trạng thái của checkbox
    } ) );
  }

  useEffect( () => {
    dispatch( getUserCart( userId ) );
  }, [] );

  // const calculateTotalPrice = () => {
  //   let totalPrice = 0;
  //   listItems.forEach( item => {
  //     if ( checkedItems[ item.id ] ) {
  //       totalPrice += item.productPrice * item.productQuantity;
  //     }
  //   } );
  //   return totalPrice;
  // }

  return (
    <div className="container d-flex">
      <div className="cart-content col-9 me-4">
        <table className="table">
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
          {/* <tbody>
            { listItems && listItems.length > 0 ? listItems.map( ( item, index ) => (
              <tr key={ index }>
                <td>
                  <input
                    type="checkbox"
                    checked={ !!checkedItems[ item.id ] } // Sử dụng checked dựa trên trạng thái của checkbox
                    onChange={ () => handleCheckboxChange( item.id ) }
                  />
                </td>
                <td>{ item.productName }</td>
                <td><img src={ item.productImage } width={ 40 } height={ 40 } /></td>
                <td>{ item.productPrice }</td>
                <td>{ item.productQuantity }</td>
                <td>{ item.amount }</td>
                <td>
                  <button
                    onClick={ () => handleDeleteCartItem( item.id ) }
                    className="btn btn-danger btn-delete">
                    <MdOutlineDeleteForever />
                  </button>
                </td>
              </tr>
            ) ) : <></> }
          </tbody> */}
        </table>
      </div>
      <div className="action-cart col-3 px-4">
        {/* <div className="amount-cart">Tổng thanh toán: { calculateTotalPrice() }</div>
        <div className="btn-buy d-flex">
          <button className="btn btn-primary mt-4 ms-auto" onClick={ () => navigate( '/checkout' ) }>Mua hàng</button>
        </div> */}
      </div>
    </div>
  )
}

export default Cart;