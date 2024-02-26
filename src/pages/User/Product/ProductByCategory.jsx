import { useDispatch, useSelector } from "react-redux";
import { getProductByCategory } from "../../../redux/products/productSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


const ProductByCategory = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const res = useSelector( state => state.product.productsByCategory );
  let products = null;
  if ( res?.EC === 0 ) {
    products = res.DT;
  }

  Number.prototype.format = function ( n, x ) {
    const re = '\\d(?=(\\d{' + ( x || 3 ) + '})+' + ( n > 0 ? '\\.' : '$' ) + ')';
    return this.toFixed( Math.max( 0, ~~n ) ).replace( new RegExp( re, 'g' ), '$&,' );
  };


  useEffect( () => {
    dispatch( getProductByCategory( params.id ) )
  }, [] )
  return (
    <div className="row">
      {
        products && products.length > 0 ?
          products.map( ( product, index ) => (
            <div key={ index }
              onClick={ () => navigate( `/category/${ product.id }` ) }
              className="product--item-container d-flex flex-center col-3 flex-column  align-items-center mt-4 clickable">
              <img src={ product.image } className="product--item__image" loading="lazy" width={ 200 } height={ 200 } />
              <div className="text text-center">
                <p className="product--item__name">{ product.name }</p>
                <p className="product--item__price fw-bold text-danger">{ product.price.format() } VNĐ</p>
              </div>
            </div>
          ) ) : <></>
      }
    </div>
  )
}

export default ProductByCategory;