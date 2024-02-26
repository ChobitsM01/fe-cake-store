import sidebarBg from '../../assets/bg2.jpg';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  ProSidebar, Menu, MenuItem, SidebarHeader,
  SidebarFooter, SidebarContent
} from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import { MdOutlinePeopleOutline, MdReorder } from "react-icons/md";
import { TiShoppingCart } from 'react-icons/ti';
import { CiBurger, CiViewList } from 'react-icons/ci';
import { useState } from 'react';
import './Sidebar.scss';

export const Sidebar = ( props ) => {
  const { toggled, handleToggleSidebar } = props;
  const [ collapsed, setCollapsed ] = useState( false );
  const setStateCollapsed = () => { setCollapsed( !collapsed ) }
  return (
    // <>
    //   <ProSidebar
    //     // image={ sidebarBg }
    //     collapsed={ collapsed }
    //     toggled={ toggled }
    //     breakPoint="md"
    //     onToggle={ handleToggleSidebar }
    //     style={ {
    //       height: 'calc(100vh - 40px)'
    //     } }
    //   >
    //     <SidebarHeader style={ { background: '#fff' } }>
    //       <div>
    //         <Menu iconShape="circle">
    //           <MenuItem className='text-dark fw-bold' icon={ <MdReorder /> } onClick={ () => setStateCollapsed() } >
    //             Admin DashBoard
    //           </MenuItem>
    //         </Menu>
    //       </div>
    //     </SidebarHeader>

    //     <SidebarContent style={ { background: '#fff', color: '#fff' } }>
    //       <Menu iconShape="circle">
    //         <MenuItem icon={ <MdOutlinePeopleOutline /> }>
    //           <NavLink className='text-dark' to='/admin/users-management'>Quản lí tài khoản</NavLink>
    //         </MenuItem>
    //         <MenuItem icon={ <CiBurger /> }>
    //           <NavLink className='text-dark' to='/admin/product-management'>Quản lí sản phẩm</NavLink>
    //         </MenuItem>
    //         <MenuItem icon={ <TiShoppingCart /> }>
    //           <NavLink className='text-dark' to='/admin/order-management'>Quản lí đơn hàng</NavLink>
    //         </MenuItem>
    //         <MenuItem icon={ <CiViewList /> }>
    //           <NavLink className='text-dark' to='/admin/categories-management'>Quản lí danh mục</NavLink>
    //         </MenuItem>
    //         <MenuItem icon={ <CiViewList /> }>
    //           <NavLink className='text-dark' to='/admin/permission-management'>Phân quyền người dùng</NavLink>
    //         </MenuItem>
    //       </Menu>
    //     </SidebarContent>

    //     <SidebarFooter style={ { textAlign: 'center', background: '#fff', color: '#333' } }>
    //       <div className="sidebar-btn-wrapper" style={ { padding: '20px 24px' } }>

    //       </div>
    //     </SidebarFooter>
    //   </ProSidebar >
    // </>
    <div className='sidebar'>
      <div className="sidebar-header fs-5">
        <div style={ { lineHeight: '24px', margin: '12px' } } className='d-flex align-items-center'>
          <CiViewList style={ { fontSize: 22 } } className='me-2' />
          Menu quản trị</div>
      </div>
      <hr />
      <div className="menu-item-link">
        <NavLink className=' d-block' to='/admin/users-management'>
          Quản lí tài khoản
        </NavLink>

        <NavLink className=' d-block' to='/admin/product-management'>
          Quản lí sản phẩm
        </NavLink>

        <NavLink className=' d-block' to='/admin/order-management'>
          Quản lí đơn hàng
        </NavLink>

        <NavLink className=' d-block' to='/admin/categories-management'>
          Quản lí danh mục
        </NavLink>

        <NavLink className=' d-block' to='/admin/permission-management'>
          Phân quyền người dùng
        </NavLink>
        <NavLink className=' d-block' to='/admin/sale'>
          Thống kê
        </NavLink>
      </div>
    </div>
  )
}
