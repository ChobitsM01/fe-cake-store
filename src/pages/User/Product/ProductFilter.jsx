import { useSelector } from "react-redux";

const ProductFilter = () => {
  const prodFil = useSelector( state => state.product.filRes.DT );
  Number.prototype.format = function ( n, x ) {
    const re = '\\d(?=(\\d{' + ( x || 3 ) + '})+' + ( n > 0 ? '\\.' : '$' ) + ')';
    return this.toFixed( Math.max( 0, ~~n ) ).replace( new RegExp( re, 'g' ), '$&,' );
  };
  return (
    <div className="search-container container">
      <div className="row">

        {
          prodFil && prodFil.length > 0 ?
            prodFil.map( ( product, index ) => (
              <div key={ index }
                className="product--item-container d-flex flex-center col-3 flex-column  align-items-center mt-4 clickable">
                <img
                  // onClick={ () => navigate( `/product/${ product.id }` ) }
                  src={ product.image }
                  className="product--item__image" loading="lazy" height={ 150 } width={ 200 } />
                <div className="text text-center">
                  <p className="product--item__name">
                    { product.name }
                  </p>
                  <div className="product--item__price fw-bold text-danger">
                    { product.price.format() }
                    VNĐ</div>
                  <button
                    // onClick={ () => handleAddToCart( product ) }
                    className="btn btn-dark fw-bold">Thêm vào giỏ hàng</button>
                </div>
              </div>
            ) )
            :
            <div className="text-center fs-3">
              Xin lỗi cửa hàng hiện chưa có sản phẩm quý khách cần
            </div>
        }


      </div>
    </div>
  )
}

export default ProductFilter;