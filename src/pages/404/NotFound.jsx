import { NavLink } from "react-router-dom"

export const NotFound = () => {

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <div className="fs-1">Trang bạn vừa truy cập không tồn tại</div>
      <NavLink to='/' className="btn btn-primary mt-3 fw-bold">Trở về trang chủ</NavLink>
    </div>
  )
}