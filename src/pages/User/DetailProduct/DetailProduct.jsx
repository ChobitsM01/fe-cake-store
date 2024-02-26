import { Suspense, useState } from "react";
import LoadingSpinner from "../../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAProduct } from "../../../redux/products/productSlice";
import './DetailProduct.scss'


const DetailProduct = () => {
  const [ quantity, setQuantity ] = useState( 1 );
  const params = useParams();
  const dispatch = useDispatch();
  const res = useSelector( state => state.product.product );
  let product = null;
  if ( res?.EC === 0 ) {
    product = res.DT;
  }

  const handleBtnQuantity = ( action ) => {
    if ( action === '-' ) {
      setQuantity( +quantity - 1 )
    }
    if ( action === '+' ) {
      setQuantity( +quantity + 1 )
    }
  }
  const handleChange = ( value ) => {
    const userInput = value;

    // Kiểm tra nếu userInput là một số
    if ( /^\d+$/.test( userInput ) ) {
      setQuantity( userInput );
    }
  };
  useEffect( () => {
    dispatch( getAProduct( params.id ) )
  }, [] );

  Number.prototype.format = function ( n, x ) {
    const re = '\\d(?=(\\d{' + ( x || 3 ) + '})+' + ( n > 0 ? '\\.' : '$' ) + ')';
    return this.toFixed( Math.max( 0, ~~n ) ).replace( new RegExp( re, 'g' ), '$&,' );
  };


  return (
    <Suspense fallback={ <LoadingSpinner /> }>
      <div className="detail-product__container container d-flex">
        {
          product && product !== null &&
          <>
            <div className="left col-7">
              <img src={ product.image } alt="" width={ 400 } height={ 400 } className="mx-auto" />
            </div>
            <div className="right col-5 mt-4">
              <p className="product-name"><b>Tên sản phẩm:</b> { product.name }</p>
              <p className="product-price"><b>Giá:    { product.price.format() } VNĐ</b> </p>
              <div className="product-quantity">
                <b>Số lượng:</b>
                <button
                  onClick={ () => handleBtnQuantity( '-' ) }
                  className={ quantity && quantity < 2 ? "btn btn-dark disabled ms-4" : "btn btn-dark ms-4" }

                >-</button>
                <input className="input-quantity mx-2"
                  onChange={ ( e ) => handleChange( e.target.value ) }
                  type="text" value={ quantity } />
                <button
                  onClick={ () => handleBtnQuantity( '+' ) }
                  className="btn btn-dark fw-bold">+</button>
              </div>
              <button className="btn btn-dark text-white fw-bold mt-4">Thêm vào giỏ hàng</button>
            </div>
          </>
        }

      </div>
    </Suspense>
  )
}

export default DetailProduct;