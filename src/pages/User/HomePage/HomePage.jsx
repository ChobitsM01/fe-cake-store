import { useNavigate } from 'react-router-dom';
import barner from '../../../../public/img/barner.jpg';
import './HomePage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getNewProduct } from '../../../redux/products/productSlice';
import Loading from '../../../components/Loading/Loading';

const HomePage = () => {
  let newProducts = []
  const res = useSelector( state => state.product.DT.DT );
  let status = useSelector( state => state.product.status );
  if ( res ) {
    newProducts = res;
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  Number.prototype.format = function ( n, x ) {
    const re = '\\d(?=(\\d{' + ( x || 3 ) + '})+' + ( n > 0 ? '\\.' : '$' ) + ')';
    return this.toFixed( Math.max( 0, ~~n ) ).replace( new RegExp( re, 'g' ), '$&,' );
  };

  useEffect( () => {
    dispatch( getNewProduct() );
  }, [] );
  return (
    <>

      <div className="container home-container my-4">
        <div className="barner">
          <img className='barner__image' src={ barner } alt="Barner" />
        </div>
        {
          status && status === 'idle' || status === 'Fired' ?
            <Loading />
            :
            <div className="hot-item mt-4">
              <h4 className="title text-center">Sản phẩm mới nhất</h4>
              <div className="row">
                {
                  newProducts && newProducts.length > 0 ?
                    newProducts.map( ( newProduct, index ) => (
                      <div key={ index } className="product--item-container d-flex flex-center col-3 flex-column justify-content-center align-items-center mt-4 clickable"

                      >
                        <img onClick={ () => navigate( `/product/${ newProduct.id }` ) } style={ { width: 190, height: 140 } } src={ newProduct.image } alt="" />
                        <div className="product--item__name pt-2">{ newProduct.name }</div>
                        <div className="product--item__price fw-bold text-danger">{ newProduct.price.format() } VNĐ</div>
                        <button className="btn btn-dark fw-bold mt-2">Thêm vào giỏ hàng</button>
                      </div>
                    ) )
                    :
                    <>
                      <div className="text-center">Không có sản phẩm nào</div>
                    </>
                }
              </div>

            </div>
        }

      </div>
    </>
  )

}

export default HomePage