import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Topbar } from "./components/Topbar/Topbar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/account/accountSlice";
import { Forbidden } from "./components/Forbidden/Forbidden";


export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export const AdminLayout = () => {
  let user = useSelector( selectUser );
  return (
    <>
      {
        user && user.isAuthenticated === true && user.account.userRoles === 'Admin' ?
          <>
            <Topbar />
            <div className="d-flex">
              <Sidebar />
              <div className='flex-grow-1' style={ { position: 'relative' } }>
                <Outlet />
              </div>
            </div>
          </>
          : <Forbidden />
      }
    </>
  )
}