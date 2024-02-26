import { useDispatch, useSelector } from 'react-redux';
import './Products.scss'
import { useEffect, useState } from 'react';
import { fetchProduct, getProductByCategory } from '../../../redux/products/productSlice';
import ReactPaginate from 'react-paginate';
import Loading from '../../../components/Loading/Loading';
import { Suspense } from 'react';
import { fetchCategories } from '../../../redux/categories/categoriesSlice';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../../redux/account/accountSlice';
import { addToCart } from '../../../redux/cart/cartSlice';

const Products = () => {
  let totalPage = 0;
  let listCategories = [];
  const [ listProduct, setListProduct ] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const [ limitProduct, setLimitProduct ] = useState( 15 );
  const products = useSelector( state => state.product.DT );
  const categories = useSelector( state => state.categories.DT );
  const status = useSelector( state => state.categories.status );
  const user = useSelector( selectUser );

  useEffect( () => {
    if ( products?.EC === 0 ) {
      setListProduct( products.DT.products );
      totalPage = products.DT.totalPage;
    }
  }, [ products ] )
  if ( categories ) {
    listCategories = categories.categories;
  }

  const handlePageClick = ( event ) => {
    setCurrentPage( event.selected + 1 );
    window.scrollTo( { top: 0 } );
  };

  const handleAddToCart = async ( product ) => {
    const { name, image, price, id } = product;
    let res = await dispatch( addToCart( { productId: id, name, image, price, quantity: 1, userId: user?.account?.id } ) );
  }

  Number.prototype.format = function ( n, x ) {
    const re = '\\d(?=(\\d{' + ( x || 3 ) + '})+' + ( n > 0 ? '\\.' : '$' ) + ')';
    return this.toFixed( Math.max( 0, ~~n ) ).replace( new RegExp( re, 'g' ), '$&,' );
  };

  const handleCategoryClick = async ( id ) => {
    let data = await dispatch( getProductByCategory( id ) );
    if ( data && data.payload && data.payload.DT ) {
      setListProduct( data.payload.DT );
    }
  }

  useEffect( () => {
    dispatch( fetchProduct( { currentPage: currentPage, currentLimit: limitProduct } ) );
    dispatch( fetchCategories( { currentPage: 1, currentLimit: 12 } ) );
  }, [ dispatch, currentPage ] )
  return (
    <Suspense fallback={ <Loading /> }>
      <div className="container product-container d-flex">
        <div className="categories-container col-2 pe-4 mt-4">
          <h6 className="title">Danh mục sản phẩm</h6>
          <ul className="categories-list list-group list-group-flush">
            { listCategories && listCategories.length ?
              listCategories.map( ( category, index ) => (
                <li key={ index }
                  onClick={ () => handleCategoryClick( category.id ) }
                  // onClick={ () => navigate( `/category/${ category.id }` ) }
                  className="clickable categories-item list-group-item">
                  { category.name }
                </li>
              ) )
              : <></>
            }
          </ul>
        </div>
        <div className="list--items-container col-10 mx-4 mt-4">
          <div className="row item--container">
            {
              listProduct && listProduct.length > 0 ?
                listProduct.map( ( product, index ) => (
                  <div key={ index } className='product--item-container col-4 '>
                    <div
                      className="product-item d-flex flex-center flex-column  align-items-center mt-4 p-4 clickable">
                      <img
                        onClick={ () => navigate( `/product/${ product.id }` ) }
                        src={ product.image } className="product--item__image" loading="lazy" />
                      <div className="text text-center">
                        <p className="product--item__name">{ product.name }</p>
                        <div className="product--item__price fw-bold text-danger">{ product.price.format() } VNĐ</div>
                        <button
                          onClick={ () => handleAddToCart( product ) }
                          className="btn btn-dark">Thêm vào giỏ hàng</button>
                      </div>
                    </div>
                  </div>
                ) ) : <div className=' text-center fs-3'>Hiện tại loại bánh này đã hết</div>
            }
          </div>

          <div className='user-pagination mx-auto mt-4' style={ { width: 'fit-content' } }>
            { totalPage > 0 &&
              <ReactPaginate
                nextLabel=" >>"
                onPageChange={ handlePageClick }
                pageRangeDisplayed={ 3 }
                marginPagesDisplayed={ 2 }
                pageCount={ totalPage }
                previousLabel="<< "
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={ null }
                forcePage={ +currentPage - 1 }
              />
            }
          </div>

        </div>

      </div>
    </Suspense>

  )
}

export default Products